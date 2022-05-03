import { db } from '../firebase';
import { collection, query, where, limit, getDocs, doc, updateDoc, arrayUnion, arrayRemove, orderBy } from "firebase/firestore";

export async function doesUsernameExist(username) {
  // const result = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
  const result = query(collection(db, 'users'), where('username', '==', username));
  const q_doc = await getDocs(result)
  return q_doc.docs.length > 0;
}

export async function getUserByUsername(username) {
  // const result = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
  const result = query(collection(db, 'users'), where('username', '==', username));
  const q_doc = await getDocs(result)
  return q_doc.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  // const result = await app.firestore().collection('users').where('userId', '==', userId).get();
  const result = query(collection(db, 'users'), where('userId', '==', userId));
  const q_doc = await getDocs(result)
  // console.log('check user: ', q_doc)
  const user = q_doc.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

// check all conditions before limit results
export async function getSuggestedProfiles(userId, following) {
  // let query = firebase.firestore().collection('users');

  // if (following.length > 0) {
  //   query = query(collection(db, 'users'), where('userId', 'not-in', [...following, userId]));
  // } else {
  //   query = query(collection(db, 'users'), where('userId', '!=', userId));
  // }
  // // const result = await query.limit(10).get();
  // const result = query(collection(db, 'users'), limit(10));
  // const q_doc = await getDocs(result)

  let useRef = collection(db, 'users');

  if (following.length > 0) {
    useRef = query(useRef, where('userId', 'not-in', [...following, userId]), limit(10));
  } else {
    useRef = query(useRef, where('userId', '!=', userId), limit(10));
  }

  const querySnapshot = await getDocs(useRef);

  const profiles = querySnapshot.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));

  return profiles;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id (karl's profile)
  profileId, // the user that karl requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  // return query(collection(db, 'users')
  //   .doc(loggedInUserDocId)
  //   .update({
  //     following: isFollowingProfile ?
  //       db.arrayRemove(profileId) :
  //       db.arrayUnion(profileId)
  //   }));
  const UserRef = doc(db, "users", loggedInUserDocId);
  await updateDoc(UserRef, {
    following: isFollowingProfile ?
      arrayRemove(profileId) :
      arrayUnion(profileId)
  });
}

export async function updateFollowedUserFollowers(
  profileDocId, // currently logged in user document id (karl's profile)
  loggedInUserDocId, // the user that karl requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  // return query(collection(db, 'users')
  //   .doc(profileDocId)
  //   .update({
  //     followers: isFollowingProfile ?
  //       db.arrayRemove(loggedInUserDocId) :
  //       db.arrayUnion(loggedInUserDocId)
  //   }));
  const FollowedRef = doc(db, "users", profileDocId);
  await updateDoc(FollowedRef, {
    followers: isFollowingProfile ?
      arrayRemove(loggedInUserDocId) :
      arrayUnion(loggedInUserDocId)
  });
}

export async function getPhotos(userId, following) {
  // [5,4,2] => following
  // PX: TODO: verify the order
  const result = query(collection(db, 'photos'), where('userId', 'in', following));
  const q_doc = await getDocs(result)
  // console.log('check query photo: ', q_doc)
  const userFollowedPhotos = q_doc.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      // photo.userId = 2
      const user = await getUserByUserId(photo.userId);
      // raphael
      // user[0]: first user in array
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
  const result = query(collection(db, 'photos'), where('userId', '==', userId));
  const q_doc = await getDocs(result)
  const photos = q_doc.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));
  return photos;
}

export function getSundayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay();

  const sunday = new Date(today.setDate(first));
  return sunday;
}

export async function getUserFitsByUserId(userId) {
  const result = query(collection(db, 'fitness'), where('userId', '==', userId));
  const q_doc = await getDocs(result)
  // const fits = q_doc.docs.map((fit) => ({
  //   ...fit.data(),
  //   docId: fit.id
  // }));
  const Sunday = getSundayOfCurrentWeek();
  const fits = q_doc.docs.filter(fit => fit.data().dateCreated.toDate() > Sunday.getTime()).map((fit) => ({
    ...fit.data(),
    docId: fit.id
  }));
  // console.log('today', a);
  // console.log('Monday', b);
  // console.log('whether date pass', a.getTime() > b.getTime());
  return fits;
}

export async function CountCalorie(user, fits) {
  var sum = 0;
  var MET = 0;
  var BodyWeight = 70;
  if (user?.weight) {
    BodyWeight = parseFloat(user.weight);
  }
  fits.map((fit) => {
    switch (fit.sportsType) {
      case 'Bicycling':
        if (fit.distance / fit.duration > 0.33) {
          MET = 16.0
        }
        else if (fit.distance / fit.duration > 0.27) {
          MET = 12.0
        }
        else if (fit.distance / fit.duration > 0.23) {
          MET = 10.0
        }
        else {
          MET = 8.0
        }
        break;
      case 'Jogging':
        MET = 8;
        break;
      case 'Walking':
        if (fit.duration / fit.distance > 20) {
          MET = 3.3
        }
        else if (fit.duration / fit.distance > 15) {
          MET = 3.8
        }
        else {
          MET = 5.0
        }
        break;
      case 'Running':
        if (fit.duration / fit.distance > 10) {
          MET = 10.0
        }
        else if (fit.duration / fit.distance > 9) {
          MET = 11.0
        }
        else if (fit.duration / fit.distance > 8) {
          MET = 12.5
        }
        else {
          MET = 14.0
        }
        break;
    }
    sum = sum + parseFloat(fit.duration) * MET * BodyWeight / 200;
  }
  )
  return sum
}

export async function CountLikes(photos) {
  if (photos) {
    var cnt = 0;
    const Sunday = getSundayOfCurrentWeek();
    photos.filter(photo => new Date(photo.dateCreated).getTime() > Sunday.getTime()).map((photo) => (
      cnt = cnt + photo.likes.length
    )
    )
    return cnt
  };
}

export async function CountPhotos(photos) {
  if (photos) {
    const Sunday = getSundayOfCurrentWeek();
    const weekly_photos = photos.filter(photo => new Date(photo.dateCreated).getTime() > Sunday.getTime());
    return weekly_photos.length
  };
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  // const result = query(collection(db, 'users')
  //   .where('username', '==', loggedInUserUsername) // karl (active logged in user)
  //   .where('following', 'array-contains', profileUserId)
  //   .get());
  const result = query(collection(db, 'users')
    , where('username', '==', loggedInUserUsername) // karl (active logged in user)
    , where('following', 'array-contains', profileUserId));
  const q_doc = await getDocs(result)
  const [response = {}] = q_doc.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
