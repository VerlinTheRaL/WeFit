import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Photos from './photos';
import Scores from './scores';
import { getUserPhotosByUserId, getUserFitsByUserId, CountCalorie, CountLikes, CountPhotos } from '../../services/firebase';

export default function UserProfile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
      profile: {},
      photosCollection: null,
      followerCount: 0,
      caloriesTotal: 0,
      activityTotal: 0,
      popularityTotal: 0
    };
  
    const [{ profile, photosCollection, followerCount, caloriesTotal, activityTotal, popularityTotal }, dispatch] = useReducer(
      reducer,
      initialState
    );
  
    useEffect(() => {
      async function getProfileInfoAndPhotos() {
        const photos = await getUserPhotosByUserId(user.userId);
        const fits = await getUserFitsByUserId(user.userId);
        const calories = await CountCalorie(user, fits);
        const activity = await CountPhotos(photos);
        const popularity = await CountLikes(photos);
        dispatch({ profile: user, photosCollection: photos, caloriesTotal: calories, activityTotal: activity, popularityTotal: popularity, followerCount: user.followers.length });
      }
      getProfileInfoAndPhotos();
    }, [user.username]);
  
    return (
      <>
        <Header
          photosCount={photosCollection ? photosCollection.length : 0}
          profile={profile}
          followerCount={followerCount}
          setFollowerCount={dispatch}
        />
        <Scores calories = {caloriesTotal} activity = {activityTotal} popularity = {popularityTotal}/>
        <Photos photos={photosCollection} />
      </>
    );
  }

  UserProfile.propTypes = {
    user: PropTypes.shape({
      dateCreated: PropTypes.number,
      emailAddress: PropTypes.string,
      followers: PropTypes.array,
      following: PropTypes.array,
      fullName: PropTypes.string,
      userId: PropTypes.string,
      username: PropTypes.string
    })
  };