import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ? (
    <div className="WelcomeScreen">
      <div className="main">
        <h1>Welcome to the Meet app</h1>
        <h4>
          Log in to see upcoming events around the world for full-stack developers 
        </h4>
          <div className="btn_cont" align="center">
            <div class="google-btn">
              <div class="google-icon-wrapper">
                  <img
                    class="google-icon" 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google sign-in"
                  />
              </div>
              <button onClick={() => { props.getAccessToken() }}
                rel="nofollow noopener"
                class="btn-text" >
                <b>Sign in with Google</b>
              </button>
            </div>
          </div>
          <a
            href="https://YOUR_GITHUB_USERNAME.github.io/meet/privacy.html"
            rel="nofollow noopener"
            title="Privacy policy" >
            Privacy policy
          </a>
        </div>
    </div>
  )
  :null
}

export default WelcomeScreen;