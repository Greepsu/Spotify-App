import React from 'react'

//import style 
import "../styles/Playlist.css"
import TrackSearchResult from './TrackSearchResult'

export default function Likes({ playlist, chooseTrack, removeFromPlaylist }) {
    return (
        <div className="playlist" >
            Playlist: {playlist.map(track => (
               <TrackSearchResult track={track}
               key={track.uri} chooseTrack={chooseTrack} playlist={playlist} removeFromPlaylist={removeFromPlaylist} />
            ))}
        </div>
    )
}
