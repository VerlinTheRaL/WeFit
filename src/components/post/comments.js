import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  const arrOfDisplayNames = comments.displayName;
  const arrOfComments = comments.comment;

  const displayNameSlice = arrOfDisplayNames.slice(0, commentsSlice);
  const commentSlice = arrOfComments.slice(0, commentsSlice);

  const commentsMapped = displayNameSlice.map((displayName, i) => { 
    return [displayName, commentSlice[i]] 
  });

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {commentsMapped.map((item) => (
          <p key={`${item[1]}-${item[0]}`} className="mb-1">
            <Link to={`/p-${item[0]}`}>
              <span className="mr-1 font-bold">{item[0]}</span>
            </Link>
            <span>{item[1]}</span>
          </p>
        ))}
        {/* {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))} */}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  // comments: PropTypes.array.isRequired,
  comments: PropTypes.shape({
    displayName: PropTypes.array.isRequired,
    comment: PropTypes.array.isRequired,
  }),
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
};
