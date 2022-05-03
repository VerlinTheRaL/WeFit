import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments({
      displayName: [...comments.displayName, displayName],
      comment: [...comments.comment, comment],
     });
    // setComments([...comments, { displayName, comment }]);

    // const PhotosRef = doc(db, "photos", docId);

    // return updateDoc(PhotosRef, {
    //   comments: {
    //     displayName: comments.displayName,
    //     comment: comments.comment,
    //   }
    //   // comments:
    //   //   arrayUnion({ displayName, comment })
    // });
  };

  useEffect(() => {
    if(comment != ''){
      setComment('');
      const PhotosRef = doc(db, "photos", docId);
      // console.log("comments: " + comments.comment);
      updateDoc(PhotosRef, {
        comments: {
          displayName: comments.displayName,
          comment: comments.comment,
        }
        // comments:
        //   arrayUnion({ displayName, comment })
      });
    }
  }, [comments]);

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  // comments: PropTypes.array.isRequired,
  comments: PropTypes.shape({
    displayName: PropTypes.array.isRequired,
    comment: PropTypes.array.isRequired,
  }),
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};
