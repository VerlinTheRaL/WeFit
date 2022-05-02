import { useState, useEffect } from 'react';
import { getPhotos, getUserPhotosByUserId } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user actually follow people?
      const userPostPhotos = await getUserPhotosByUserId(user.userId);
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        const postPhotos = userPostPhotos.concat(followedUserPhotos);
        postPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(postPhotos);
      } else {
        userPostPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(userPostPhotos);
      }
    }

    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}

