'use client';

import { useLista } from "../context/MusicContext";
import { Album } from "../components/album";

const PageLista = () => {
    const { lista, deleteFromLista } = useLista();

    return(
      <div className="mainContainer">
        <h1>Mis Álbumes Favoritos</h1>
        
        {lista.length === 0 ? (
          <p>Aún no tienes álbumes favoritos.</p>
        ) : (
          <div className="albumsContainer">
            {lista.map((album) => (
              <div key={album.collectionId} className="favoritoItem">
                <Album album={album} />
                <button 
                  className="BotonEliminar" 
                  onClick={() => deleteFromLista(album.collectionId)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>  
    );
};

export default PageLista;