require("dotenv").config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const { loginToSpotifyApi, callbackToSpotifyApi } = require("./user_auth");

const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

app.get("/login", (req, res) => {
  loginToSpotifyApi(req, res, spotifyApi);
});

app.get("/callback", (req, res) => {
  callbackToSpotifyApi(req, res, spotifyApi);
  // res.json({ mssg: "GET REQUEST TO /callback" });
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  spotifyApi
    .searchTracks(q)
    .then((searchData) => {
      const trackUri = searchData.body.tracks.items[0].uri;
      res.send({ uri: trackUri });
    })
    .catch((err) => {
      res.send(`Error searching ${err}`);
    });
});

app.get("/play", (req, res) => {
  const { uri } = req.query;
  spotifyApi
    .play({ uris: [uri] })
    .then(() => {
      res.send("plaback started");
    })
    .catch((err) => {
      res.send(`Error playing ${err}`);
    });
});

app.get("/current", (req, res) => {
  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      console.log("Now playing: " + data.body.item.name);
    },
    function (err) {
      console.error("Something went wrong!", err);
    }
  );
});

// app.get("/search-album", (req, res) => {
//   const { q } = req.query;
//   spotifyApi.searchTracks(`album:${q}`).then(
//     function (data) {
//       res.send(data.body.id);
//       // console.log(data.body);
//     },
//     function (err) {
//       console.log("Something went wrong!", err);
//     }
//   );
// });

app.get("/get-track-cover", (req, res) => {
  const { q } = req.query;
  spotifyApi
    .searchTracks(q)
    .then((searchData) => {
      const imageLink = searchData.body.tracks.items[0].album.images[0].url;
      res.status(200).json(imageLink);
    })
    .catch((err) => {
      res.send(`Error searching ${err}`);
    });
});

module.exports = app;
