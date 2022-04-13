import 'bulma/css/bulma.min.css';
// import your fontawesome library
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Profile.css';
import React from 'react';

function Profile() {
  return (
    <>
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
                        <a class="button is-primary" href="/dashboard">
                        <strong>Dashboard</strong>
                        </a>
                        <a class="button is-danger" href="/login">
                            <strong>Sign out</strong>
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="profile_header">
        <h1>User Profile Page</h1>
        <p>Just a skeleton page.</p>
        </div>

        <div class="profile_navbar">
        <a href="/dashboard">Dashboard</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="/login" class="profile_right">Logout</a>
        </div>

        <div class="profile_row">
            <div class="profile_side">
                <h2>About Me</h2>
                <h5>My Photo:</h5>
                <div class="profile_fakeimg" style= {{height:'200px'}}>Insert Picture Here</div>
                <p>Introduction about user</p>
                <h3>More Content</h3>
                <p>More content about user</p>
                <div class="profile_fakeimg" style={{height:'60px'}}>Insert Picture Here</div><br />
                <div class="profile_fakeimg" style={{height:'60px'}}>Insert Picture Here</div><br />
                <div class="profile_fakeimg" style={{height:'60px'}}>Insert Picture Here</div>
            </div>
            <div class="profile_main">
                <h2>Title</h2>
                <h5>Subtitle</h5>
                <div class="profile_fakeimg" style={{height:'200px'}}>Picture</div>
                <p>Some paragrah..</p>
                <p>Insert some sentence here.</p>
                <br />
                <h2>General Analysis</h2>
                <h5>Score This Week</h5>
                {/* <div class="fakeimg" style={{height:'200px'}}>Picture</div> */}
                <ul id="skill">
                    <li><span class="bar fitscore"></span><h3>Fit Score</h3></li>
                    <li><span class="bar eatscore"></span><h3>Eat Score</h3></li>
                    <li><span class="bar feelscore"></span><h3>Feel Score</h3></li>
                    <li><span class="bar otherscore"></span><h3>Other Score</h3></li>
                </ul>
                <p>Some paragrah..</p>
                <p>Insert some sentence here.</p>
            </div>
        </div>

        <div class="profile_footer">
            <h2>Footer</h2>
        </div>

    </>
  );
}

export default Profile;
