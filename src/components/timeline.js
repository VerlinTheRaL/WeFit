/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/logged-in-user';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {

    const { user } = useContext(LoggedInUserContext);
    console.log(user);

    const { user: { following } = {} } = useContext(
        LoggedInUserContext
    );

    const { photos } = usePhotos(user);
    console.log('photo ID: ', photos);

    return (
        <div className="container col-span-2">
            {following === undefined ? (
                <Skeleton count={2} width={640} height={500} className="mb-5" />
                // ) : following.length === 0 ? (
                //     <p className="flex justify-center font-bold">Follow other people to see Photos</p>
            ) : photos ? (
                photos.map((content) => <Post key={content.docId} content={content} />)

            ) : following.length === 0 ? (
                <p className="flex justify-center font-bold">Follow other people to see Photos</p>
            ) : null}
        </div>
    );
}

