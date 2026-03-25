"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";
import type { AlbumType } from "../../types/albums";
import styles from "./style.module.css";
import { useLista } from "@/app/context/MusicContext";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); 
  
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);

  const { addLista } = useLista();

  useEffect(() => {
    if (!id) return;
    
    api.get(`/lookup?id=${id}`)
      .then(res => {
        const resultado = res.data.results?.[0];
        if (resultado) {
          setAlbum(resultado);
        } else {
          setAlbum(null);
        }
      })
      .catch((err) => {
        setAlbum(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h1>Cargando detalles...</h1>;
  if (!album) return <h1>Álbum no encontrado</h1>;

  return (
    <div className={styles.detailContainer}>
      <h1>{album.collectionName}</h1>
      <img src={album.artworkUrl100.replace("100x100", "600x600")} alt={album.collectionName} />
      <h3>{album.artistName}</h3>
    </div>
  );
};

export default Page;