'use client';

import { useLista } from "../context/MusicContext";


const pageLista = () => {

    const {lista} = useLista()

    return(
      <div>
        lista.map();
      </div>  
    )
}

export default pageLista;