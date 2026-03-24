'use client';

import { useRouter } from "next/navigation";
import { useLista } from "../context/MusicContext";
import "./page.css"; // Importamos los estilos

const PageLista = () => {
    const { lista, deleteFromLista } = useLista();
    const router = useRouter();

    return(
      <div className="mainContainer">
        <h1>Mis Favoritos</h1>

        <div className="listaContainer">
          {lista.length === 0 ? (
            <p>No hay favoritos guardados.</p>
          ) : (
            lista.map((album) => (
              <div key={album.collectionId} className="itemFavorito">
                <p className="nombreAlbum">{album.collectionName}</p>
                <button 
                  className="BotonEliminar" 
                  onClick={() => deleteFromLista(album.collectionId)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>  
    );
}

export default PageLista;