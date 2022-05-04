import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { useContext} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getAuth, signOut } from 'firebase/auth'

import UserContext from './context/user';
import useUser from './hooks/use-user';
import LoggedInUserContext from './context/logged-in-user';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth'
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { doesUsernameExist } from './services/firebase';
import { useState } from 'react'
import { db } from './firebase'
import { useNavigate } from 'react-router-dom'


function ProfileSettings() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user, setActiveUser } = useUser(loggedInUser?.uid);
  const auth = getAuth();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // const validatePassword = (pass_in, confirmPass_in) => {
  //   let isValid = true;
  //   if (pass_in !== confirmPass_in) {
  //     isValid = false;
  //     setError('Passwords do not match. Please try again.');
  //   }
  //   return isValid;
  // }

  const updateInformation = async (event) => {
    event.preventDefault();
    setError('');
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {

        // const newUsername = username !== "" ? username.toLowerCase() : user.username;
        const newUsername = username !== "" ? username : user.username;
        const newFullName = fullName !== "" ? fullName : user.fullName;
        const newWeight = weight !== "" ? weight : user.weight;
        const newEmail = email !== "" ? email : user.emailAddress;

        await updateProfile(auth.currentUser, {
          displayName: username
        });

        await updateEmail(auth.currentUser, newEmail);
        await updatePassword(auth.currentUser, password);

        // firebase user collection (create a document)
        const userRef = doc(db, "users", user.docId);

        // firebase photos collection
        const photosRef = collection(db, "photos");

        // poster
        const posterQuery = query(photosRef, where("username", "==", user.username));
        const posterQuerySnapshot = await getDocs(posterQuery);

        posterQuerySnapshot.forEach( async (posterDoc) => {

          // console.log(posterDoc.id, " => ", posterDoc.data());

          await updateDoc(posterDoc.ref,
            {
              username: newUsername,
            });
        
        });

        // comments
        const commentsQuery = query(photosRef, where("comments.displayName", "array-contains", user.username));
        const commentsQuerySnapshot = await getDocs(commentsQuery);

        commentsQuerySnapshot.forEach( async (commentsDoc) => {

          const oldDisplayNames = commentsDoc.data().comments.displayName;

          const newDisplayNames = oldDisplayNames.map((item) => {
            if(item == user.username){
              return newUsername;
            }
            else{
              return item;
            }
          });

          await updateDoc(commentsDoc.ref,
            {
              comments: {
                displayName: newDisplayNames,
                comment: commentsDoc.data().comments.comment,
              },
            });
          // console.log(commentsDoc.id, " => ", commentsDoc.data().comments.displayName);

          // await updateDoc(posterDoc.ref,
          //   {
          //     username: newUsername,
          //   });
        
        });


        await updateDoc(userRef,
          {
            username: newUsername,
            fullName: newFullName,
            weight: newWeight,
            emailAddress: user.emailAddress,
          });

        // navigate('/p/' + ( username !== "" ? username.toLowerCase() : user.username ));
        navigate('/p-' + ( username !== "" ? username : user.username ))

      } catch (error) {
        setFullName('');
        setWeight('');
        setEmail('');
        setPassword('');
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
            <a class="navbar-item" href="/dashboard">
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

        <section class="hero is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="container">

            <div class="columns">

              <div class="column is-3"></div>
              <div class="column is-6">

                <h1 class="title is-4 has-text-centered is-dark">Update Profile</h1>

                <form onSubmit={updateInformation} id="update_information_form" name="update_information_form" class="box mx-6 my-6">

                  <div class="field">
                    <label class="label">Username:</label>
                    <div class="control">
                      <input class="input" type="username" name="newusername" defaultValue={user ? (`${user.username}` === 'undefined' ? '' : `${user.username}`) : ''} onChange={event => setUsername(event.target.value)}/>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Full Name:</label>
                    <div class="control">
                      <input class="input" type="fullname" name="newfullname" defaultValue={user ? (`${user.fullName}` === 'undefined' ? '' : `${user.fullName}`) : ''} onChange={event => setFullName(event.target.value)}/>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Email:</label>
                    <div class="control">
                      <input class="input" type="email" name="newemail" defaultValue={user ? (`${user.emailAddress}` === 'undefined' ? '' : `${user.emailAddress}`) : ''} onChange={event => setEmail(event.target.value)}/>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Password:</label>
                    <div class="control">
                      <input class="input" type="password" name="newpassword" placeholder="********" onChange={event => setPassword(event.target.value)}/>
                    </div>
                  </div>

                  {/* <div class="field">
                    <label class="label">Confirm password:</label>
                    <div class="control">
                      <input class="input" type="password" name="newconfirmpassword" placeholder="********" onChange={event => setConfirmPassword(event.target.value)}/>
                    </div>
                  </div> */}

                  <div class="field">
                    <label class="label">Weight:</label>
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

export default ProfileSettings;
ProfileSettings.propTypes = {
  user: PropTypes.object.isRequired
};