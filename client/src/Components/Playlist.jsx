import React from "react";

//import style
import "../styles/Playlist.css";

//import component
import TrackSearchResult from "./TrackSearchResult";

//Import windows size tracker
import { useWindowSize } from "react-use";

export default function Likes({
  playlist,
  chooseTrack,
  removeFromPlaylist,
  toggleMenu,
}) {
  const { width } = useWindowSize();
  const breakpoint = 768;

  const playlistStyle = () => {
    return width > breakpoint
      ? {}
      : toggleMenu
      ? { display: "block" }
      : { display: "none" };
  };
  return (
    <div className="playlist" style={playlistStyle()}>
      <span>Playlist: </span>
      <hr />
      <div className="playlist-tracks">
        {playlist.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
            playlist={playlist}
            removeFromPlaylist={removeFromPlaylist}
          />
        ))}
      </div>
    </div>
  );
}
