'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/api";
import type { AlbumType } from "../../types/albums";
import styles from "./style.module.css";
import { useLista } from "@/app/context/MusicContext";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;

  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { addLista } = useLista();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    api.get(`/lookup?id=${id}`)
      .then(res => {
        const resultado = res.data.results?.[0];
        if (resultado) {
          setAlbum(resultado);
        } else {
          setAlbum(null);
          setError("Álbum no encontrado");
        }
      })
      .catch((err) => {
        setAlbum(null);
        setError(err.message || "Error al cargar");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      {!album && loading && <h1>Cargando detalles...</h1>}
      
      {album && (
        <>
          <h1>{album.collectionName}</h1>
          <img 
            src={album.artworkUrl100.replace("100x100", "600x600")} 
            alt={album.collectionName} 
          />
          <h3>{album.artistName}</h3>
        </>
      )}

      {error && <h1>{error}</h1>}
    </div>
  );
};

export default Page;