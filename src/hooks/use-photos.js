import { useState, useEffect } from 'react';
import { getPhotos, getUserPhotosByUserId } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      if (user?.following?.length > 0) {

        const followedUserPhotos = await getPhotos(user.userId, user.following);
        const userPostPhotos = await getUserPhotosByUserId(user.userId);

        const postPhotos = userPostPhotos.concat(followedUserPhotos);
        console.log(postPhotos);
        // re-arrange array to be newest photos first by dateCreated
        postPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        console.log(postPhotos);
        setPhotos(postPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}

