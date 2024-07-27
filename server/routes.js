const express = require("express");
const router = express.Router();
const { loginToSpotifyApi, callbackToSpotifyApi } = require("./user_auth");

router.get("/login", (req, res) => {
  loginToSpotifyApi();

  //   const scopes = [
  //     "user-read-private",
  //     "user-read-email",
  //     "user-read-playback-state",
  //     "user-modify-playback-state",
  //   ];
  //   res.redirect(spotifyApi.createAuthorizeURL(scopes));
  res.status(200).json({ mssg: "GET REQUEST TO /api/login" });
});

router.get("/callback", (req, res) => {
  //   callbackToSpotifyApi();

  // const error = req.query.error;
  // const code = req.query.code;
  // const state = req.query.state;
  // if (error) {
  //   console.error("Error: ", error);
  //   res.send(`Error: ${error}`);
  //   return;
  // }
  // spotifyApi
  //   .authorizationCodeGrant(code)
  //   .then((data) => {
  //     const accessToken = data.body["access_token"];
  //     const refreshToken = data.body["refresh_token"];
  //     const expiresIn = data.body["expires_in"];
  //     spotifyApi.setAccessToken(accessToken);
  //     spotifyApi.setRefreshToken(refreshToken);
  //     console.log(accessToken, refreshToken);
  //     res.send("success");
  //     setInterval(async () => {
  //       const data = await spotifyApi.refreshAccessToken();
  //       const accessTokenRefreshed = data.body["access_token"];
  //       spotifyApi.setAccessToken(accessTokenRefreshed);
  //     }, (expiresIn / 2) * 100);
  //   })
  //   .catch((error) => {
  //     console.error("Error: ", error);
  //     res.send("Error getting token");
  //   });
  res.status(200).json({ mssg: "GET REQUEST TO /api/callback" });
});

module.exports = router;
