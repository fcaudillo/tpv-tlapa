import React from 'react'

const Producto = (props) => (
   <div>
       <div> id : {props.data.id} </div>
       <div> descripcion: {props.data.description} </div>

   </div>

)

export default Producto;
