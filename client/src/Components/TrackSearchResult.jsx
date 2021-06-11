import React from 'react'

//import style
import "../styles/TrackSearchResult.css"

//import assets
import plusIcon from "../assets/icons/plus-icon.svg"
import minusIcon from "../assets/icons/minus-icon.svg"

export default function TrackSearchResult({ track, chooseTrack, addToPlaylist, removeFromPlaylist, playlist }) {
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

            {playlist.includes(track) ? 
            <button className="track-playlist-button" onClick={() => removeFromPlaylist(track)} >
                <i><img src={minusIcon} alt="Add icon" /></i>
            </button> 
            :
            <button className="track-playlist-button" onClick={() => addToPlaylist(track)} >
                <i><img src={plusIcon} alt="Add icon" /></i>
                </button>
}

        </div>
    )
}
