import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAuthValue } from './AuthContext'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
//import { auth } from './firebase'
import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard';
import Login from './Login';

function Authenticate() {
  const { currentUser } = useAuthValue();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("hiiiii");
      return <Dashboard />
    }
    else{
      console.log("booooo");
      return <Login />
    }
  });
}

export default Authenticate;