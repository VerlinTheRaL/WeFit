import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './AuthContext'

import Landing from './Landing';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <div className="main">
      <Router>
        <AuthProvider value={{ currentUser }}>
          <Routes>
            <Route index element={<Landing />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </AuthProvider>
      </Router>
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
