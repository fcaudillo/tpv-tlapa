
import React from 'react'
import './TablePrice'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from  '../../actions'

export const TablePrice = (props) => {
    const dispatch = useDispatch();
    const [categoryNormalize,setCategoryNormalize]  = React.useState({})

    React.useEffect(() =>{
       var normalize = {};
       data.forEach ( pr => {
          normalize[pr.codigoInterno] = pr;
       });
        
       setCategoryNormalize(normalize);
    },[])



    const headers = [
        [
           { 
                title : "Imagen",
                colspan: 1,
                rowspan: 2,
                render: (text, idx ) => <p>Imagen</p>          
           },          
           { 
              title : "Tubo de cobre",
              colspan: 4,
              render: (text, idx ) => <p className='text-center fw-bold fs-4'>{text}</p>          
           }
        ],
        [
            { 
                title : "Cobrecel",
                colspan: 2,
                render: (text, idx ) => <p className='text-center'>{text}</p>          
             },
             { 
                title : "Nacobre",
                colspan: 2,
                render: (text, idx ) => <p className='text-center'>{text}</p>          
             }

        ]
        ,
        [
            {
                title: 'Medidas',
                render: (text, idx ) => <p className='text-left'>{text}</p> 
            },
            { 
                title : "Metro",
                render: (text, idx ) => <p className='text-center'>{text}</p>          
             },
             { 
                title : "Tubo 6 mts",
                render: (text, idx ) => <p className='text-center'>{text}</p>          
             }
             ,
            { 
                title : "Metro",
                render: (text, idx ) => <p className='text-center'>{text}</p>          
             },
             { 
                title : "Tubo 6 mts",
                render: (text, idx ) => <p className='text-center'>{text}</p>          
             }

        ]
    ]

    const metadataBody = [
        ["1/2\" (13 mm)", "1957","2582","2917","2916"],
        ["3/4\" (19 mm)", "1958","2583","2919","2918"],
        ["1\" (25 mm)"  , "1959","2584","2921","2920"]
    ]


    const data = [
        {
            "codigoInterno": "1957",
            "codigoProveedor": "15221A",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "METRO TUBO COBRE RIGIDO TIPO N 13MM  1/2 COBRECEL",
            "categoria": 2,
            "existencia": 2,
            "minimoExistencia": 2,
            "maximoExistencia": 8,
            "precioCompra": 63.33,
            "precioVenta": 82,
            "ubicacion": "UNK",
            "unidadVenta": "metro",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "1958",
            "codigoProveedor": "15222",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "METRO TUBO COBRE RIGIDO COBRECEL TIPO N 19MM  3/4\"",
            "categoria": 2,
            "existencia": 7,
            "minimoExistencia": 2,
            "maximoExistencia": 8,
            "precioCompra": 98.72,
            "precioVenta": 128,
            "ubicacion": "UNK",
            "unidadVenta": "metro",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "1959",
            "codigoProveedor": "20824",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "METRO TUBO COBRE RIGIDO COBRECEL TIPO N 25MM  1\"",
            "categoria": 2,
            "existencia": 4,
            "minimoExistencia": 2,
            "maximoExistencia": 8,
            "precioCompra": 150,
            "precioVenta": 195,
            "ubicacion": "UNK",
            "unidadVenta": "metro",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2582",
            "codigoProveedor": "15221",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "TUBO COBRE RIGIDO TIPO N 13MM  1/2\"X 6.10MT COBRECEL",
            "categoria": 2,
            "existencia": 3,
            "minimoExistencia": 2,
            "maximoExistencia": 10,
            "precioCompra": 317.23,
            "precioVenta": 380,
            "ubicacion": "UNK",
            "unidadVenta": "pza",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2583",
            "codigoProveedor": "15222",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "TUBO COBRE RIGIDO TIPO N 19MM  3/4\"X 6.10MT COBRECEL",
            "categoria": 2,
            "existencia": 5,
            "minimoExistencia": 2,
            "maximoExistencia": 8,
            "precioCompra": 592.35,
            "precioVenta": 710,
            "ubicacion": "UNK",
            "unidadVenta": "pza",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2584",
            "codigoProveedor": "20824",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "TUBO COBRE RIGIDO TIPO N 25MM  1\"X 6.10MT COBRECEL",
            "categoria": 2,
            "existencia": 4,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 900.19,
            "precioVenta": 1080,
            "ubicacion": "UNK",
            "unidadVenta": "pza",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2917",
            "codigoProveedor": "1789A",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "METRO TUBO COBRE RIGIDO TIPO M  13MM   1/2\" NACOBRE",
            "categoria": 1,
            "existencia": 20,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 87.36,
            "precioVenta": 114,
            "ubicacion": "UNKNOW",
            "unidadVenta": "PZ",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2919",
            "codigoProveedor": "1791A",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "METRO TUBO COBRE RIGIDO TIPO M  19MM   3/4\" NACOBRE",
            "categoria": 1,
            "existencia": 3,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 145.37,
            "precioVenta": 189,
            "ubicacion": "UNKNOW",
            "unidadVenta": "PZ",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2921",
            "codigoProveedor": "1788A",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "METRO TUBO COBRE RIGIDO TIPO M  25MM     1\" NACOBRE",
            "categoria": 1,
            "existencia": 6,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 211.25,
            "precioVenta": 275,
            "ubicacion": "UNKNOW",
            "unidadVenta": "PZ",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2916",
            "codigoProveedor": "1789",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "TUBO COBRE RIGIDO TIPO M  13MM   1/2\"X 6.10MT NACOBRE",
            "categoria": 1,
            "existencia": 9,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 524.19,
            "precioVenta": 630,
            "ubicacion": "UNKNOW",
            "unidadVenta": "PZ",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2918",
            "codigoProveedor": "1791",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "TUBO COBRE RIGIDO TIPO M  19MM   3/4\"X 6.10MT NACOBRE",
            "categoria": 1,
            "existencia": 10,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 872.27,
            "precioVenta": 1045,
            "ubicacion": "UNKNOW",
            "unidadVenta": "PZ",
            "puedeVenderse": true
        },
        {
            "codigoInterno": "2920",
            "codigoProveedor": "1788",
            "codigoBarras": "",
            "proveedor": 3,
            "descripcion": "TUBO COBRE RIGIDO TIPO M  25MM     1\"X 6.10MT NACOBRE",
            "categoria": 1,
            "existencia": 10,
            "minimoExistencia": 1,
            "maximoExistencia": 3,
            "precioCompra": 1267.55,
            "precioVenta": 1520,
            "ubicacion": "UNKNOW",
            "unidadVenta": "PZ",
            "puedeVenderse": true
        }
    ]

    
    const addTicketProduct = (sku) => {
        dispatch(actions.modifyGlobalCodebar({"barcode": sku, "qty": 1,"addToTicket": 1, "addLector": false,  "date": new Date()}));
   }

    const createHeaders = (headers) => {

      return (
        <>
         {
            headers.map (row => 
                <tr>
                    {
                        row.map ( (column,columnIdx) => 
                            
                                <th className='border' rowSpan={column.rowspan ? column.rowspan : 1} colSpan={column.colspan ? column.colspan : 1}>
                                    { 
                                    column.render ? 
                                        column.render(column.title, columnIdx)
                                    :
                                        <div> 
                                            {column.title}
                                        </div> 
                                    
                                    
                                    }

                                </th>

                            )
                       
                    }
                </tr>
            )
          }

        </>);


    }

    const  renderCell = (row, col, text) => {

        if (col == 0) {
            return (<> <span> {text }</span> </>)
        }

        return (
            <>
               <button type="button" class="btn btn-link" onClick={ () => addTicketProduct(text)} >
                   { text in categoryNormalize ? categoryNormalize[text].precioCompra : "" }
               </button>
           </>
        );

    }

    const createBody = (metadata) => {

        return (
          <>
           {
              metadata.map ( (metarow, rowIdx) => 
                  <tr>
                      {
                          metarow.map ( (text,columnIdx) => 
                              
                                  <th className='border'>
                                      { 
                                          <div> 
                                              {renderCell(rowIdx,columnIdx,text)}
                                          </div> 
                                      
                                      
                                      }
  
                                  </th>
  
                              )
                         
                      }
                  </tr>
              )
            }
  
          </>);
  
  
    }
  

    return (
       <table class="table table-sm table-striped">
         <thead>
             { createHeaders(headers)}
         </thead>
         <tbody>
             { createBody(metadataBody)}
         </tbody>   
       </table>
    );

}
