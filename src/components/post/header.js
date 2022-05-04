/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
  return (
    //flex border-b border-gray-primary h-4 p-4 
    <div className="px-4 py-4">
      <div className="flex items-center">
        <Link to={`/p-${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile picture`}
            onError={(e) => {
              e.target.src = '/images/avatars/default.png';
            }}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};
