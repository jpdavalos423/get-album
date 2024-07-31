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

app.get("/", (req, res) => {
  loginToSpotifyApi(req, res, spotifyApi);
});

app.get("/callback", (req, res) => {
  callbackToSpotifyApi(req, res, spotifyApi);
});

// app.get("/search", (req, res) => {
//   const { q } = req.query;
//   spotifyApi
//     .searchTracks(q)
//     .then((searchData) => {
//       const trackUri = searchData.body.tracks.items[0].uri;
//       res.send({ uri: trackUri });
//     })
//     .catch((err) => {
//       res.send(`Error searching ${err}`);
//     });
// });

// app.get("/play", (req, res) => {
//   const { uri } = req.query;
//   spotifyApi
//     .play({ uris: [uri] })
//     .then(() => {
//       res.send("plaback started");
//     })
//     .catch((err) => {
//       res.send(`Error playing ${err}`);
//     });
// });

app.get("/current-cover", (req, res) => {
  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      res.status(200).json(data.body.item.album.images[1].url);
    },
    function (err) {
      console.error("Something went wrong!", err);
    }
  );
});
app.get("/current-track", (req, res) => {
  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      res.status(200).json(data.body.item.name);
    },
    function (err) {
      console.error("Something went wrong!", err);
    }
  );
});
app.get("/current-artist", (req, res) => {
  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      res.status(200).json(data.body.item.artists[0].name);
    },
    function (err) {
      console.error("Something went wrong!", err);
    }
  );
});
app.get("/current-album", (req, res) => {
  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      res.status(200).json(data.body.item.album.name);
    },
    function (err) {
      console.error("Something went wrong!", err);
    }
  );
});

// app.get("/get-track-cover", (req, res) => {
//   const { q } = req.query;
//   spotifyApi
//     .searchTracks(q)
//     .then((searchData) => {
//       const imageLink = searchData.body.tracks.items[0].album.images[1].url;
//       res.status(200).json(imageLink);
//     })
//     .catch((err) => {
//       res.send(`Error searching ${err}`);
//     });
// });

app.get("/get-playback-state", (req, res) => {
  spotifyApi.getMyCurrentPlaybackState().then(
    function (data) {
      // Output items
      if (data.body && data.body.is_playing) {
        res.status(200).json(true);
        // console.log("User is currently playing something!");
      } else {
        res.status(200).json(false);
        // console.log("User is not playing anything, or doing so in private.");
      }
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

app.get("/pause", (req, res) => {
  spotifyApi.pause().then(
    function () {
      console.log("Playback paused");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
});

app.get("/play", (req, res) => {
  spotifyApi.play().then(
    function () {
      console.log("Playback started");
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
});

module.exports = app;
