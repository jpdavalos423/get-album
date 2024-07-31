import { useEffect, useState } from "react";


export default function NowPlaying() {
    const [currentCover, setCurrentCover] = useState("");
    const [currentTrack, setCurrentTrack] = useState("");
    const [currentArtist, setCurrentArtist] = useState("");
    const [currentAlbum, setCurrentAlbum] = useState("");

    const getPlaybackState = async () => {
      const res = await fetch(`/get-playback-state`);
      const state = await res.json();
      return state;
    }

    useEffect(() => {
      
        const getCurrentCover = async () => {
          const res = await fetch(`/current-cover`);
          const currentCover = await res.json();
          setCurrentCover(currentCover)
        }
        const getCurrentTrack = async () => {
          const res = await fetch(`/current-track`);
          const currentTrack = await res.json();
          setCurrentTrack(currentTrack)
        }
        const getCurrentArtist = async () => {
          const res = await fetch(`/current-artist`);
          const currentArtist = await res.json();
          setCurrentArtist(currentArtist)
        }
        const getCurrentAlbum = async () => {
          const res = await fetch(`/current-album`);
          const currentAlbum = await res.json();
          setCurrentAlbum(currentAlbum)
        }
        setInterval(() => {
          try {
            getCurrentCover()
            getCurrentTrack()
            getCurrentArtist()
            getCurrentAlbum()
          } catch (e) {
            console.error(e)
            return;
          }
        }, 3000)
    }, [])

    // useEffect(() => {
      
    //   setInterval(() => {getCurrentCover()}, 1000);
    // //   getCurrentCover()
    // }, [])
    // useEffect(() => {
      
    //   setInterval(() => {getCurrentTrack()}, 1000);
    // //   getCurrentTrack()
    // }, [])
    // useEffect(() => {
      
    //   setInterval(() => {getCurrentArtist()}, 1000);
    // //   getCurrentArtist()
    // }, [])
    // useEffect(() => {
      
    //   setInterval(() => {getCurrentAlbum()}, 1000);
    // //   getCurrentAlbum()
    // }, [])

    const togglePlayback = async () => {
      console.log('toggle play');
      if (getPlaybackState()) {
        console.log('pause playback');
        const res = await fetch(`/pause`);
      } else {
        console.log('resume playback');
        const res = await fetch(`/play`);
      }
    }

    
    
   

    return (
        <div className="now__playing">
            <div className="now__playinginfo">
                <div className="cover__play">
                    <img src={currentCover} alt="track cover" />
                </div>
                <div className="description">
                    <img src="/Spotify_Logo_RGB_White.png" alt="spotify logo" className="logo"/>
                    <h2 className="song__title">{currentTrack}</h2>
                    <h3 className="artist__name">{currentArtist}</h3>
                    <h4 className="album__name">{currentAlbum}</h4>
                    
                </div>
            </div>
            <div className="now__playingcontrol">
                <div className="backward__button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241 64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-145 11.5 9.6 192 160z"/></svg>
                </div>
                <div className="play__button" onClick={togglePlayback}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>
                </div>
                <div className="forward__button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241l0-145c0-17.7 14.3-32 32-32s32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-145-11.5 9.6-192 160z"/></svg>
                </div>
                
            </div>
        </div>
       
    )
}