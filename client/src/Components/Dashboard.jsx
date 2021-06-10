import React, { useState, useEffect } from "react";

//Import styles
import "../styles/Dashboard.css";

//import Componnets
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

//Import Auth Hooks
import useAuth from "../Hooks/useAuth";

import axios from "axios";
//Import Spotify Web Api
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: "19cf2729635e42888b4b0356649090bb",
});

export default function Dashboard({ code }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [likes, setLikes] = useState([]);
  const accessToken = useAuth(code);

  const likesTrack = (track) => {
    setLikes((trackList) => [...trackList, track]);

    console.log("track title:  " + track.title)

    likes.map(like => {
      return console.log("Likes track title " + like.title)
    })
  };

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:5000/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => setLyrics(res.data.lyrics));
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImages = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumsUrl: smallestAlbumImages.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div className="dashboard">
      <form className="dashboard-form" action="">
        <input
          className="dashboard-input"
          type="text"
          placeholder="Search Songs or Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="dashboard-songlist">
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
            likesTrack={likesTrack}
          />
        ))}
        {searchResults.length === 0 && <div className="lyrics">{lyrics}</div>}
      </div>
      <div className="player-container">
        <Player
          className="player"
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
        />
      </div>
    </div>
  );
}
