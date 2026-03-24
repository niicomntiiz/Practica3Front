'use client';

import { createContext, ReactNode, useContext, useState } from "react";
import { AlbumType } from "../types/albums";

type ListaContextType = {
    lista: AlbumType[];
    addLista: (item: AlbumType) => void;
    deleteFromLista: (id: number) => void;
};

const ListaContext = createContext<ListaContextType | null>(null);

export const ListaProvider = ({children} : {children: ReactNode}) => {
    const [lista, setLista] = useState<AlbumType[]>([]);

    const addLista = (item: AlbumType) => {
        if (!lista.some(album => album.collectionId === item.collectionId)) {
            setLista([...lista, item]);
        }
    };

    const deleteFromLista = (id: number) => {
        setLista(lista.filter(album => album.collectionId !== id));
    };

    return(
        <ListaContext.Provider value={{lista, addLista, deleteFromLista}}>
            {children}
        </ListaContext.Provider>
    );
};

export const useLista = () => {
    const context = useContext(ListaContext);
    if(!context) {
        throw new Error("tsx out of lista context");
    }
    return context;
};