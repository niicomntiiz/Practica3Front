"use client"

import "./page.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter()
  return(
    <div className="mainContainer">
      <h1>Buscador de álbumes en iTunes</h1>

      <Link className="BotonBuscar" href="pagAlbums">Buscador</Link>
      <Link className="BotonLista" href="favoritos">Favoritos</Link>
    </div>
  );
};

export default App;