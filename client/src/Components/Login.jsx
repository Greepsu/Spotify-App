import React from "react";

//import styles
import "../styles/Login.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
  return (
    <div className="login">
      <div className="login-card">
        <h1>Spotify</h1>
        <p>Music for everyone</p>
        <p>Catch million of lyrics</p>
        <div className="login-button">
          <a href={AUTH_URL}>Login with Spotify</a>
        </div>
      </div>
    </div>
  );
}
