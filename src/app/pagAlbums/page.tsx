'use client'
import { api } from "@/lib/api/api";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Album } from "../components/album";
import { AlbumType } from "../types/albums";
import "./page.css";

const laOtra = () => {
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (!search.trim()) {
      setAlbums([]);
      return;
    }
    
    setLoading(true);
    api.get(`/search?term=${search}&entity=album&limit=20`).then((e) => {
      setAlbums(e.data.results || []);
    }).catch((e) => {
      setError(`Error cargando los datos: ${e.message ? e.message : e}`);
    }).finally(() => {
      setLoading(false);
    });
  }, [search]);

  const ejecutarBusqueda = () => {
    setSearch(inputText);
  };

  return (
    <div className="mainContainer">
      <h1>Buscador de álbums de iTunes</h1>
      <div className="controlesContainer">
        <input
          type="text"
          placeholder="Busca un álbum..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="buscadorInput"
        />
        <button className="BotonBuscar" onClick={ejecutarBusqueda}>
          Buscar
        </button>
      </div>

      {loading && <h1>Loading...</h1>}
      {error && <h2>{error}</h2>}
      
      <div className="albumsContainer">
        {!loading && albums.map((c) => (
          <Link key={c.collectionId} href={`/pagAlbums/${c.collectionId}`}>
            <Album album={c} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default laOtra;