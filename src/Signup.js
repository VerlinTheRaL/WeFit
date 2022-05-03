import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { doesUsernameExist } from './services/firebase';
import { useState } from 'react'
import { auth, db } from './firebase'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore";

function Signup() {
  const [username, setUsername] = useState('')
  // const [fullName, setFullName] = useState('');
  // const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // const validatePassword = () => {
  //   const isValid = true
  //   if (password !== '' && confirmPassword !== '') {
  //     if (password !== confirmPassword) {
  //       isValid = false
  //       setError('Passwords do not match. Please try again.')
  //     }
  //   }
  //   return isValid
  // }

  const register = async (event) => {
    event.preventDefault();
    setError('');
    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
          displayName: username
        });

        // firebase user collection (create a document)
        await addDoc(collection(db, 'users'),
          {
            userId: auth.currentUser.uid,
            // username: username.toLowerCase(),
            username: username,
            fullName: '',
            weight: '',
            emailAddress: email.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now()
          });

        navigate('/dashboard')

      } catch (error) {
        // setFullName('');
        // setWeight('');
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
    <div classname="main">

      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <FontAwesomeIcon icon="fa-solid fa-dumbbell" /> &nbsp; <strong>WeFit</strong>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <strong>Already a member? <a class="has-text-link" href="/login">Log in now!</a></strong>
            </div>
          </div>
        </div>
      </nav>

      <section class="hero is-light is-fullheight-with-navbar" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)', backgroundSize: 'cover' }}>
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered is-centered">
              <div class="column is-6"></div>

              <div class="column is-6 has-text-centered">
                {error && <p className="mb-4 text-s text-red-primary">{error}</p>}
                <form onSubmit={register} id="registration_form" name="registration_form" class="box mx-6 my-6">
                  <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left">
                      <input class="input" type="username" name="username" placeholder="Your username" value={username} required onChange={event => setUsername(event.target.value)} />
                      <span class="icon is-small is-left">
                        <FontAwesomeIcon icon="fa-solid fa-user"/>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                      <input class="input" type="email" name="email" placeholder="Your email, e.g., example@gmail.com" value={email} required onChange={event => setEmail(event.target.value)} />
                      <span class="icon is-small is-left">
                        <FontAwesomeIcon icon="fa-solid fa-envelope"/>
                      </span>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left">
                      <input class="input" type="password" name="password" id="password" placeholder="********" value={password} required onChange={event => setPassword(event.target.value)} />
                      <span class="icon is-small is-left">
                        <FontAwesomeIcon icon="fa-solid fa-lock"/>
                      </span>
                    </div>
                  </div>

                  {/* <div class="field">
                    <label class="label">Confirm Password</label>
                    <div class="control has-icons-left">
                      <input class="input" type="password" name="confirm_password" id="confirm_password" placeholder="********" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                      <span class="icon is-small is-left">
                        <FontAwesomeIcon icon="fa-solid fa-lock"/>
                      </span>
                    </div>
                  </div> */}

                  {/* <div class="field">
                    <label class="label">Full Name</label>
                    <div class="control">
                      <input class="input" type="fullname" name="fullname" placeholder="Your full name (optional)" value={fullName} onChange={event => setFullName(event.target.value)} />
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Weight</label>
                    <div class="control">
                      <input class="input" type="weight" name="weight" placeholder="Your weight in kilograms (optional)" value={weight} onChange={event => setWeight(event.target.value)} />
                    </div>
                  </div> */}

                  <button class="button is-primary" type="submit">
                    <strong>Sign up</strong>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;