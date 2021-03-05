import React, { createContext, useState } from 'react';
import { Configuraciones } from './Configuraciones';

const Context = createContext()

const Provider = ({ children } ) => {
   const [ parametros, setParametros ] = useState(Configuraciones);

   const value = {
     parametros,

   }

   return (
     <Context.Provider value={ value } >
       { children }
     </Context.Provider>
   )

}

export const ProviderContext = Provider;
export const ApplicationContext = Context;
