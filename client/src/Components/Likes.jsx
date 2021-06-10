import React from 'react'

//import style 
import "../styles/Likes.css"
import TrackSearchResult from './TrackSearchResult'

export default function Likes({ playlist, chooseTrack }) {
    return (
        <div className="likes" >
            Playlist: {playlist.map(track => (
               <TrackSearchResult track={track}
               key={track.uri} chooseTrack={chooseTrack} />
            ))}
        </div>
    )
}
