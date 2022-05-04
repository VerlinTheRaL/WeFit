import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getAuth, signOut } from 'firebase/auth'
// import { auth } from './firebase'
// import { Navigate } from 'react-router-dom'

import Timeline from './components/timeline';
import Sidebar from './components/sidebar';
import UserContext from './context/user';
import useUser from './hooks/use-user';
// import LoggedInUserContext from '../context/logged-in-user';
import LoggedInUserContext from './context/logged-in-user';

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
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
      <div className="main">

        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/dashboard">
              <FontAwesomeIcon icon="fa-solid fa-dumbbell" /> &nbsp; <strong>WeFit</strong>
            </a>
          </div>

          <div class="navbar-menu">
            <div class="navbar-end">
              <CameraIcon className="h-15 w-8" onClick={() => setOpen(true)} style={{cursor: 'pointer'}} />

              {user ? (
                <div class="navbar-item">
                  <div class="dropdown is-right is-hoverable">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <span>
                          <FontAwesomeIcon icon="fa-solid fa-bars"/>
                        </span>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                      <div class="dropdown-content">
                        <a class="dropdown-item has-text-dark has-text-weight-bold" href="/dashboard">Dashboard</a>
                        <a class="dropdown-item has-text-dark has-text-weight-bold" href={`/p-${user.username}`}>Profile</a>                        
                        <a class="dropdown-item has-text-dark has-text-weight-bold" href={`/psettings-${user.username}`}>Settings</a>
                        <a class="dropdown-item has-text-danger has-text-weight-bold" onClick={() => signOut(auth)} href="/login">Sign out</a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="navbar-item">
                  <div class="dropdown is-right is-hoverable">
                    <div class="dropdown-trigger">
                      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <span>
                          <FontAwesomeIcon icon="fa-solid fa-bars"/>
                        </span>
                      </button>
                    </div>
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