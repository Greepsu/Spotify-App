import React from 'react'

//import style
import "../styles/TrackSearchResult.css"

export default function TrackSearchResult({ track, chooseTrack, likesTrack }) {
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
            <button className="track-like" onClick={() => likesTrack(track)} >Add to likes</button>
        </div>
    )
}
