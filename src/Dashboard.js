import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { useEffect } from 'react';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuthValue } from './AuthContext'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
// import { auth } from './firebase'
// import { Navigate } from 'react-router-dom'

import Timeline from './components/timeline';
import Sidebar from './components/sidebar';
import usePhotos from './hooks/use-photos';
import UserContext from './context/user';
import useUser from './hooks/use-user';
// import LoggedInUserContext from '../context/logged-in-user';
import LoggedInUserContext from './context/logged-in-user';
import { useNavigate } from 'react-router-dom';

import {
  PlusCircleIcon,
  HomeIcon,
  CameraIcon,
} from "@heroicons/react/solid";

import { useRecoilState } from "recoil";
import { modalState } from "./atoms/modal-atom";
import Modal from "./components/modal";

function Dashboard() {
  const { user: loggedInUser } = useContext(UserContext);
  // console.log('check user id: ', loggedInUser.uid)
  const { user, setActiveUser } = useUser(loggedInUser?.uid);
  // console.log('check user: ', user)
  const auth = getAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="main">

        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <FontAwesomeIcon icon="fa-solid fa-dumbbell" /> &nbsp; <strong>WeFit</strong>
            </a>
          </div>

          <div class="navbar-menu">
            <div class="navbar-end">
              <CameraIcon className="h-15 w-8" onClick={() => setOpen(true)} />

              <div class="navbar-item">
                <strong>Dashboard: {user?.email}</strong>
              </div>
              {user ? (
                <div class="navbar-item">
                  <div class="buttons">
                    <a class="button is-info" href="/profile">
                      <strong>Profile</strong>
                    </a>
                    <a class="button is-danger" onClick={() => signOut(auth)} href="/login">
                      <strong>Sign out</strong>
                    </a>
                  </div>
                </div>
              ) : (
                <div class="navbar-item">
                  <div class="buttons">
                    <a class="button is-info" href="/login">
                      <strong>Login</strong>
                    </a>
                    <a class="button is-primary" href="/signup">
                      <strong>Sign up</strong>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">

          <Timeline />
          <Sidebar />
          <Modal />
        </div>

      </div>
    </LoggedInUserContext.Provider>
  );
}

export default Dashboard;
Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};