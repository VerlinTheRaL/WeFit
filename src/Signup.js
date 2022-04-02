import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState } from 'react'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validatePassword = () => {
    const isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords do not match. Please try again.')
      }
    }
    return isValid
  }

  const register = event => {
    event.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/dashboard')
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
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
              <strong>Already a member? <a href="/login">Log in now!</a></strong>
            </div>
          </div>
        </div>
      </nav>

      <section class="hero is-light is-fullheight-with-navbar" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)', backgroundSize: 'cover'}}>
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered is-centered">
              <div class="column is-5"></div>

              <div class="column is-7 has-text-centered">
                <form onSubmit={register} id="registration_form" name="registration_form" class="box mx-6 my-6">
                  <div class = "field">
                    <label class="label">Email</label>
                    <div class="control">
                      <input class="input" type="email" name="email" placeholder="Your email, e.g., example@gmail.com" value={email} onChange={event => setEmail(event.target.value)}/>
                    </div>
                  </div>

                  <div class = "field">
                    <label class="label">Password</label>
                    <div class="control">
                      <input class="input" type="password" name="password" id="password" placeholder="********" value={password} onChange={event => setPassword(event.target.value)}/>
                    </div>
                  </div>

                  <div class = "field">
                    <label class="label">Confirm Password</label>
                    <div class="control">
                      <input class="input" type="password" name="confirm_password" id="confirm_password" placeholder="********" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
                    </div>
                  </div>

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