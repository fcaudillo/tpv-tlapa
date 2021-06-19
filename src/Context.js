import React, { createContext, useState } from 'react';
import { Configuraciones } from './Configuraciones';

const Context = createContext()

const Provider = ({ children } ) => {
   const provs = [
           { value :'2', label : "Disfert"},
           { value :'1', label : "Trupper"},
           { value : '3', label: "gravioto"},
           { value : '4', label: "generico"},
           { value : '5', label: "tepalcates"},
           { value : '6', label: "mazely"},
           { value : '7', label: "mitzu"}
   ];
   const [ parametros, setParametros ] = useState(Configuraciones);
   const [ proveedores, setProveedores ] = useState(provs);

   const value = {
     parametros,
     proveedores,
     findProveedores: () => {

     }

   }

   return (
     <Context.Provider value={ value } >
       { children }
     </Context.Provider>
   )

}

export const ProviderContext = Provider;
export const ApplicationContext = Context;
