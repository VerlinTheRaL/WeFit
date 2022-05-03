import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Aos from 'aos';
import "aos/dist/aos.css";

function Landing() {
  Aos.init();

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
              <div class="buttons">
                <a class="button is-primary" href="/signup">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-info" href="/login">
                  <strong>Log in</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section class="hero is-dark is-fullheight-with-navbar" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(https://img.wallpapersafari.com/desktop/1920/1080/16/58/Aymbd9.jpg)', backgroundSize: 'cover'}}>
        <div class="hero-body">
          <div class="container has-text-left">
            <h2 class="subtitle">
              JOIN THE FITNESS MOVEMENT
            </h2>
            <h1 class="title is-1 is-spaced my-3">
              Friends That <br/> Sweat Together <br/> Stay Together
            </h1>
            <a href="/signup" class="button is-primary my-6"> <strong> Try WeFit now! &nbsp; </strong> <FontAwesomeIcon icon="fa-solid fa-person-running" /> </a>
          </div>
        </div>
      </section>

      <section class="hero is-white is-medium">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered is-centered">
              <div data-aos="fade-down" class="column is-6 has-text-centered">
                <FontAwesomeIcon icon="fa-solid fa-heart-pulse" size="10x" transform="grow-2"/>
              </div>

              <div class="column is-6" data-aos="fade-right" >
                <h1 class="title is-1 mb-6">
                  Fitness Tracking Made Easy
                </h1>
                <h2 class="subtitle">
                  Track all the exercises you've done in our portal &#8212; be it running, cycling, jogging, or even just walking
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero is-white is-medium">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered is-centered">
              <div class="column is-6" data-aos="fade-left" >
                <h1 class="title is-1 mb-6">
                  It's Always Better with Friends
                </h1>
                <h2 class="subtitle">
                  Share your workout posts with your friends &#8212; don't forget to LIKE and COMMENT on your favorite posts
                </h2>
              </div>

              <div data-aos="fade-down" class="column is-6 has-text-centered">
                <FontAwesomeIcon icon="fa-solid fa-user-group" size="10x" transform="grow-2"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero is-white is-medium">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-vcentered is-centered">
              <div data-aos="fade-down" class="column is-6 has-text-centered">
                <FontAwesomeIcon icon="fa-solid fa-ranking-star" size="10x" transform="grow-2"/>
              </div>

              <div class="column is-6" data-aos="fade-right" >
                <h1 class="title is-1 mb-6">
                  Friendly Competition to Keep You Going
                </h1>
                <h2 class="subtitle">
                  Track your progress through milestones and see how you fare on your commmunity leaderboards
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero is-dark is-large" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(https://prod.static9.net.au/_/media/2016/06/29/12/21/160629coachexercise.jpg)', backgroundSize: 'cover'}}>
        <div class="hero-body">
          <div class="container has-text-centered">
            <h2 class="subtitle">
              What are you waiting for?
            </h2>
            <h1 class="title is-1 is-spaced">
              The best project you'll ever work on is YOU
            </h1>
            <a href="/signup" class="button is-primary my-3"> <strong> Try WeFit now! &nbsp; </strong> <FontAwesomeIcon icon="fa-solid fa-person-running" /> </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;
