'use client'
import { useState, useEffect } from "react";
import type { AlbumType } from "../types/albums";
import { api } from "../../lib/api/api";
import "./style.css";
import { useLista } from "../context/MusicContext";

interface AlbumProps {
  artistId?: string; 
  album?: AlbumType;
}

export const Album = ({ artistId, album: initialAlbum }: AlbumProps) => {
  const [album, setAlbum] = useState<AlbumType | null>(initialAlbum || null);
  const { addLista } = useLista();

  useEffect(() => {
    if (initialAlbum) {
      setAlbum(initialAlbum);
      return;
    }

    if (artistId) {
      api.get(`/lookup?id=${artistId}&entity=album`).then((res) => {
        setAlbum(res.data.results?.[0] || null);
      });
    }
  }, [artistId, initialAlbum]);

  if (!album) {
    return <h1>Cargando álbum...</h1>;
  }

  return (
    <div className="characterContainer">
      <h2>{album.collectionName}</h2>
      {album.artworkUrl100 && <img src={album.artworkUrl100} alt={album.collectionName} />}
      <button 
        className="BotonFavorito" 
        onClick={(e) => {
          e.preventDefault();
          addLista(album);
        }}
      >
        Favorito
      </button>
    </div>
  );
};