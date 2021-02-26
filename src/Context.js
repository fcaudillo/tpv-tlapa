import React, { createContext, useState } from 'react';

const Context = createContext()

const Provider = ({ children } ) => {
   const [ parametros, setParametros ] = useState({'nombre':'El elegante'});

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
