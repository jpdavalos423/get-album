import { useEffect, useState } from "react";


export default function NowPlaying() {
    const [currentCover, setCurrentCover] = useState("");
    const [currentTrack, setCurrentTrack] = useState("");
    const [currentArtist, setCurrentArtist] = useState("");
    const [currentAlbum, setCurrentAlbum] = useState("");


    useEffect(() => {
      const getCurrentCover = async () => {
        const res = await fetch(`/current-cover`);
        const currentCover = await res.json();
        setCurrentCover(currentCover)
      }
      setInterval(() => {getCurrentCover()}, 1000);
    //   getCurrentCover()
    }, [])
    useEffect(() => {
      const getCurrentTrack = async () => {
        const res = await fetch(`/current-track`);
        const currentTrack = await res.json();
        setCurrentTrack(currentTrack)
      }
      setInterval(() => {getCurrentTrack()}, 1000);
    //   getCurrentTrack()
    }, [])
    useEffect(() => {
      const getCurrentArtist = async () => {
        const res = await fetch(`/current-artist`);
        const currentArtist = await res.json();
        setCurrentArtist(currentArtist)
      }
      setInterval(() => {getCurrentArtist()}, 1000);
    //   getCurrentArtist()
    }, [])
    useEffect(() => {
      const getCurrentAlbum = async () => {
        const res = await fetch(`/current-album`);
        const currentAlbum = await res.json();
        setCurrentAlbum(currentAlbum)
      }
      setInterval(() => {getCurrentAlbum()}, 1000);
    //   getCurrentAlbum()
    }, [])

    

    return (
        <div className="now__playing">
            <div className="cover__play">
                <img src={currentCover} alt="track cover" />
            </div>
            <div className="description">
                <h2>{currentTrack}</h2>
                <h3>{currentArtist}</h3>
                <h4>{currentAlbum}</h4>
            </div>
        </div>
       
    )
}