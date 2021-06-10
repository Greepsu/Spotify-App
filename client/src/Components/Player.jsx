import React, { useEffect, useState } from 'react'

//import Spotify Player
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if(!accessToken) return null
    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            initialVolume={0.3}
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
        />
    )
}
