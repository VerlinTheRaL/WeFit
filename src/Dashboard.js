import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuthValue } from './AuthContext'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { Navigate } from 'react-router-dom'

function Dashboard() {
  const { currentUser } = useAuthValue();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("Not logged in")
    }
  });

  return (
    <div className="main">

      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <FontAwesomeIcon icon="fa-solid fa-dumbbell" /> &nbsp; <strong>WeFit</strong>
          </a>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <strong>Dashboard: { currentUser?.email }</strong>
            </div>
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-danger" onClick={ () => signOut(auth) } href="/login">
                  <strong>Sign out</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Dashboard;