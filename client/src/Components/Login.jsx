import React from 'react'

//import styles
import '../styles/Login.css'

const CLIENT_ID = "19cf2729635e42888b4b0356649090bb"
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


export default function Login() {
    return (
        <div className="login" >
            <div className="login-button">
                <a href={AUTH_URL}>Login with Spotify</a>
            </div>
        </div>
    )
}
