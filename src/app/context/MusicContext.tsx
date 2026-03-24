'use client';

import {createContext, ReactNode, useContext, useState } from "react";

type ListaContextType = {
    lista: string[];
    addLista: (item:string) => void;
    deleteFromLista: (item:string) => void;
}

const ListaContext = createContext<ListaContextType | null>(null);

export const ListaProvider = ({children} : {children: ReactNode}) => {
    const [lista, setLista] = useState<string[]>([]);

    const addLista = (item: string) => {
        setLista([...lista, item]);
    };

    const deleteFromLista = (item: string) => {
        setLista(lista.filter(x => x !== item))
    };

    return(
        <ListaContext.Provider value={{lista, addLista, deleteFromLista}}>
            {children}
        </ListaContext.Provider>
    )
}

export const useLista = () => {
    const context = useContext(ListaContext);
    if(!context) {
        throw new Error("tsx out of lista context");
    }
    return context;
}