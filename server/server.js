const express = require("express");
const cors = require("cors");
const lyricsFinder = require('lyrics-finder')
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`App running on ${port} port`));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "19cf2729635e42888b4b0356649090bb",
    clientSecret: "a171ec998ae949d59578fb15e38ff9bb",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn : data.body.expires_in
      })
    })
    .catch(() => res.sendStatus(400));
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "19cf2729635e42888b4b0356649090bb",
    clientSecret: "a171ec998ae949d59578fb15e38ff9bb",
  });

  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
      .catch(() => res.sendStatus(400))
  });

  app.get('/lyrics', async (req, res) => {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics found"
    res.json({ lyrics })
  })

