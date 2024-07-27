import { useEffect, useState } from "react";

function App() {
  const [album, setAlbum] = useState("");

  useEffect(() => {
    const getAlbumCover = async () => {
      const res = await fetch(`/get-track-cover?q=as`);
      const albumCover = await res.json();

      setAlbum(albumCover)
    }
    getAlbumCover()
  }, [])

  return (
    <main>
      <h1>Get Album</h1>

      <img src={album} alt="" />
    </main>
  );
}

export default App;
