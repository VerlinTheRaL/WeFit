import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Signup() {
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
                <form id="login-form" class="box mx-6 my-6">
                  <div class = "field">
                    <label class="label">Email</label>
                    <div class="control">
                      <input class="input" type="text" name="email" placeholder="Your email, e.g., example@gmail.com" />
                    </div>
                  </div>

                  <div class = "field">
                    <label class="label">Password</label>
                    <div class="control">
                      <input class="input" type="password" name="password" id="password" placeholder="********"/>
                    </div>
                  </div>

                  <button class="button is-primary">
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