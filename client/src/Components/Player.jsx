import React, { useEffect, useState } from "react";

//import Spotify Player
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      initialVolume={0.2}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        bgColor: "#161616",
        color: "#F1F1F1",
        sliderColor: "#007BFF",
        sliderHandleColor: "#D1D1D1",
        trackArtistColor: "#D1D1D1",
        trackNameColor: "#D1D1D1",
        height: 50,
      }}
    />
  );
}
