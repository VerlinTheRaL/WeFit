import { useState, useEffect, Suspense } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './AuthContext'

import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-route';

import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile'
import ProfileSettings from './ProfileSettings'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

function App() {
  // const [currentUser, setCurrentUser] = useState(null)

  const { user } = useAuthListener();
  // console.log('check auth user: ', user);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user)
  //   })
  // }, [])

  return (
    <div className="main">
      <UserContext.Provider value={{ user }}>
        <RecoilRoot>
          <Router>
            {/* <AuthProvider value={{ currentUser }}> */}
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/landing" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path='/dashboard' element = {<ProtectedRoute user={user}/>}>
                <Route path="/dashboard" element={<Dashboard user={user}/>} />
              </Route>
              <Route path='/p-:username' element = {<ProtectedRoute user={user}/>}>
                <Route path="/p-:username" element={<Profile user={user}/>} />
              </Route>
              <Route path='/psettings-:username' element = {<ProtectedRoute user={user}/>}>
                <Route path="/psettings-:username" element={<ProfileSettings user={user}/>} />
              </Route>
              <Route path="/" element={<Landing />} />
              <Route path="*" element={<Landing />} />
            </Routes>
            {/* </AuthProvider> */}
          </Router>
        </RecoilRoot>
      </UserContext.Provider>
    </div>
  );
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello
        </a>
      </header>
    </div>
  );
  */
}

export default App;
