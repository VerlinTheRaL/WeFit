import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user, ...rest }) {
    let location = useLocation();
    return user ? <Outlet user={user} /> : <Navigate to="/login" state={{ from: location }} />;

}

ProtectedRoute.propTypes = {
  user: PropTypes.object
};
