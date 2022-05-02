import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getAuth, signOut } from 'firebase/auth'
// import { auth } from './firebase'
// import { Navigate } from 'react-router-dom'

import UserContext from './context/user';
import useUser from './hooks/use-user';
// import LoggedInUserContext from '../context/logged-in-user';
import LoggedInUserContext from './context/logged-in-user';
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from "firebase/firestore";
import { doesUsernameExist } from './services/firebase';
import { useState } from 'react'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user, setActiveUser } = useUser(loggedInUser?.uid);
  const auth = getAuth();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const updateInformation = async (event) => {
    event.preventDefault();
    setError('');
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: username
        });

        // firebase user collection (create a document)
        const userRef = doc(db, "users", user.docId);
        await updateDoc(userRef,
          {
            username: ( username != "" ? username.toLowerCase() : user.username ),
            fullName: ( fullName != "" ? fullName : user.fullName ),
            weight: ( weight != "" ? weight : user.weight ),
          });

        navigate('/p/' + ( username != "" ? username.toLowerCase() : user.username ))

      } catch (error) {
        setFullName('');
        setWeight('');
        // setEmail('');
        // setPassword('');
        // setConfirmPassword('')
        console.log(error);
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
  }
  
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
                        <a class="dropdown-item has-text-dark has-text-weight-bold" href={`/p/${user.username}`}>Profile</a>
                        <a class="dropdown-item has-text-dark has-text-weight-bold" href="/dashboard">Dashboard</a>
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

        <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="container">

            <div class="columns">

              <div class="column is-3"></div>
              <div class="column is-6">

                <h1 class="title is-4 has-text-centered is-dark">Update Profile</h1>

                <form onSubmit={updateInformation} id="update_information_form" name="update_information_form" class="box mx-6 my-6">

                  {/* <div class="field">
                    <label class="label">Old Username:</label>
                    <div class="control">
                      <input class="input" type="username" name="oldusername" value={user ? (`${user.username}` === 'undefined' ? '' : `${user.username}`) : ''} disabled/>
                    </div>
                  </div> */}

                  <div class="field">
                    <label class="label">New Username:</label>
                    <div class="control">
                      <input class="input" type="username" name="newusername" defaultValue={user ? (`${user.username}` === 'undefined' ? '' : `${user.username}`) : ''} onChange={event => setUsername(event.target.value)}/>
                    </div>
                  </div>

                  {/* <div class="field">
                    <label class="label">Old Full Name:</label>
                    <div class="control">
                      <input class="input" type="fullname" name="oldfullname" value={user ? (`${user.fullName}` === 'undefined' ? '' : `${user.fullName}`) : ''} disabled/>
                    </div>
                  </div> */}

                  <div class="field">
                    <label class="label">New Full Name:</label>
                    <div class="control">
                      <input class="input" type="fullname" name="newfullname" defaultValue={user ? (`${user.fullName}` === 'undefined' ? '' : `${user.fullName}`) : ''} onChange={event => setFullName(event.target.value)}/>
                    </div>
                  </div>

                  {/* <div class="field">
                    <label class="label">Old Weight:</label>
                    <div class="control">
                      <input class="input" type="weight" name="oldweight" value={user ? (`${user.weight}` === 'undefined' ? '' : `${user.weight}`) : ''} disabled/>
                    </div>
                  </div> */}

                  <div class="field">
                    <label class="label">New Weight:</label>
                    <div class="control">
                      <input class="input" type="weight" name="newweight" defaultValue={user ? (`${user.weight}` === 'undefined' ? '' : `${user.weight}`) : ''} onChange={event => setWeight(event.target.value)}/>
                    </div>
                  </div>

                  <button class="button is-primary" type="submit">
                    <strong>Update</strong>
                  </button>
                </form>

              </div>

              <div class="column is-3"></div>
            </div>
          </div>
        </div>
      </section>

        

      </div>
    </LoggedInUserContext.Provider>
  );
}

export default Dashboard;
Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};