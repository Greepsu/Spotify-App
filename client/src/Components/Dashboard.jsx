import React, { useState, useEffect } from "react";

//Import styles
import "../styles/Dashboard.css";

//import Componnets
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import Playlist from "./Playlist";

//Import Auth Hooks
import useAuth from "../Hooks/useAuth";

//Import windows size tracker
import { useWindowSize } from "react-use"

//Inport axios
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
  const [playlist, setPlaylist] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(false);

  const accessToken = useAuth(code);
  const { width } = useWindowSize();
  const breakpoint = 768;

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/lyrics`, {
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

  const addToPlaylist = (track) => {
    setPlaylist((tracks) => [...tracks, track]);
  };

  const removeFromPlaylist = (track) => {
    const filteredPlaylist = playlist.filter((item) => item !== track);
    setPlaylist(filteredPlaylist);
  };



  return (
    <div className="dashboard">
      <div className="dashboard-form">
        <input
          className="dashboard-input"
          type="text"
          placeholder="Search Songs or Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="dashboard-section">
        {width > breakpoint ? (
          <Playlist
            playlist={playlist}
            chooseTrack={chooseTrack}
            removeFromPlaylist={removeFromPlaylist}
          />
        ) : (
          <div className="playlist-responsive-container" >
            <button className="playlist-button" onClick={() => setToggleMenu(!toggleMenu)}>
              My playlist
            </button>
            <Playlist
              playlist={playlist}
              chooseTrack={chooseTrack}
              removeFromPlaylist={removeFromPlaylist}
              toggleMenu={toggleMenu}
            />
          </div>
        )}
        <div className="dashboard-songlist">
          {search.length === 0 && lyrics.length === 0 ? (
            <div className="dashboard-browsing-text">
              Browse your favorite music now !
            </div>
          ) : (
            ""
          )}
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
              addToPlaylist={addToPlaylist}
              removeFromPlaylist={removeFromPlaylist}
              playlist={playlist}
            />
          ))}
          {searchResults.length === 0 && <div className="lyrics">{lyrics}</div>}
        </div>
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
