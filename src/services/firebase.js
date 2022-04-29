import { db } from '../firebase';
import { collection, query, where, limit, getDocs, doc, updateDoc, arrayUnion, arrayRemove, orderBy } from "firebase/firestore";

export async function doesUsernameExist(username) {
  const result = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
  const q_doc = await getDocs(result)
  return q_doc.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = query(collection(db, 'users'), where('username', '==', username.toLowerCase()));
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
  const result = query(collection(db, 'photos'), where('userId', 'in', following), orderBy("dateCreated", "desc"));
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

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  // const result = query(collection(db, 'users')
  //   .where('username', '==', loggedInUserUsername) // karl (active logged in user)
  //   .where('following', 'array-contains', profileUserId)
  //   .get());
  const result = query(collection(db, 'users')
    ,where('username', '==', loggedInUserUsername) // karl (active logged in user)
    ,where('following', 'array-contains', profileUserId));
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
