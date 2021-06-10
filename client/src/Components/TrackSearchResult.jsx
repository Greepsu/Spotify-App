import React from 'react'

//import style
import "../styles/TrackSearchResult.css"

export default function TrackSearchResult({ track, chooseTrack, addToPlaylist }) {
    const handlePlay = () => {
        chooseTrack(track)
    }
    return (
        <div className="track" onClick={handlePlay} >
            <div className="track-info">
                <img className="track-cover" src={track.albumsUrl} alt="album cover" />
                <div className="track-description" >
                    <div className="track-title" >{track.title}</div>
                    <div className="track-artist" >{track.artist}</div>
                </div>
            </div>
            <button className="track-like" onClick={() => addToPlaylist(track)} >Add to Playlist</button>
        </div>
    )
}
