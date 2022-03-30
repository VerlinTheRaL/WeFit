import logo from './logo.svg';
import './App.css';

import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  return (
    <div classname="main">
      <section class="hero is-dark is-fullheight-with-navbar" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(https://img.wallpapersafari.com/desktop/1920/1080/16/58/Aymbd9.jpg)', backgroundSize: 'cover'}}>
        <div class="hero-body">
          <div class="container has-text-left">
            <h1 class="title is-1 is-spaced">
              <FontAwesomeIcon icon="fa-solid fa-person-running" />
              WeFit
            </h1>
            <h2 class="subtitle">Friends that sweat together stay together</h2>
          </div>
        </div>
      </section>
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
