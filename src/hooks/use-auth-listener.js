import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
// import { auth } from './firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'


export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  // console.log(user)
  const auth = getAuth();
  // const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // we have a user...therefore we can store the user in localstorage
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // we don't have an authUser, therefore clear the localstorage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener();
  });

  return { user };
}
