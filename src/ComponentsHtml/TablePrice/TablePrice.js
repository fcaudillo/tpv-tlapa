
import React,{ useEffect, useState , useContext}  from 'react'

import './TablePrice'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from  '../../actions'
import { IMAGES_PATH } from '../../bussiness/endpoints'
import editIcon from '../../images/edit.svg'
import { ApplicationContext }  from '../../Context'

export const TablePrice = ( props ) => {
    const dispatch = useDispatch();
    const [headers,setHeaders] = useState(props.headersProps)
    const [metadataBody,setMetadataBody] = useState(props.metadataBodyProps)
    const [data,setData] = useState(props.dataProps)
    const [categoryNormalize,setCategoryNormalize]  = useState({})
    const opciones = ['Vender', 'Editar', 'Solicitar', 'Claves'];
    const [typeAction, setTypeAction] = useState(0)
    const [active, setActive] = useState(false)
    const { edit, editProductMissing } = props
    const value = useContext(ApplicationContext);
    const { parametros } = value;

    useEffect ( () => {
       setHeaders(props.headersProps);
    },[props.headersProps])
   
    useEffect ( () => {
        setMetadataBody(props.metadataBodyProps);
     },[props.metadataBodyProps])

     useEffect ( () => {
        setData(props.dataProps);
     },[props.dataProps])

     useEffect ( () => {
        setData(props.dataProps);
     },[])

    
    const executeAction = (data) => {
        if (typeAction == 0) {
             dispatch(actions.modifyGlobalCodebar({"barcode": data.sku, "qty": 1,"addToTicket": 1, "addLector": false,  "date": new Date()}));
        }else if (typeAction == 1) {
             edit(data.sku)
        }else if (typeAction == 2){
             editProductMissing(data.sku);
        }

     }

    const renderColumn = (column, idx) => {

        if (column.typeRender == 1){
            return <p className={column.className}>{column.title}</p>
        }

        return <p>{column.title}</p>
    }

    const handleAction = (action, key) => {
        if (action == "editar"){
           edit(key)
        }else if (action == "solicitar"){
           editProductMissing(key);
        }

     }

    const createHeaders = (headers) => {

      return (
        <>
         {
            headers ? 
              headers.map (row => 
                
                    <tr>
                        {
                            row.map ( (column,columnIdx) => 
                            
                                    <th className='border header' scope="col" rowSpan={column.rowspan ? column.rowspan : 1} colSpan={column.colspan ? column.colspan : 1}>
                                        { 
                                        'typeRender' in column ? 
                                            renderColumn(column, columnIdx)
                                        :
                                            <p> 
                                                {column.title}
                                            </p> 
                                        
                                        
                                        }

                                    </th>

                                )
                        
                        }
                    </tr>
               
             )
            :
            <tr></tr>
          }

        </>);


    }

    const  getLabelCell = (cell) => {
       var res =  data.filter(pr => pr.codigoInterno == cell.sku)

       if (res && res.length > 0) {
           var  x = res[0]
           if (typeAction == 3){
             return x.codigoInterno
           }
           return x.precioVenta;
       }

       return ""
    }
  
    const handleChange = (event) => {
        setTypeAction(Number(event.target.value));
      };

    return (
        
       <table class="table table-sm table-striped">
         <thead  className="thead-light">
            <tr>
            <select value={typeAction} onChange={handleChange}>
                {opciones.map((opcion, index) => (
                <option key={index} value={index}>
                    {opcion}
                </option>
                ))}
            </select>
            </tr>
             { createHeaders(headers)}
         </thead>
         <tbody>
         {
            data && data.length > 0 
            ?
              
               metadataBody.map( (metarow, rowIdx) => 
               
                  <tr>
                      {
                          metarow.map ( (data,columnIdx) => 
                              
                                  <td className='border'>
                                      { 
                                           
                                               
                                                "title" in data 
                                                    ?
                                                    <div>
                                                    <span className={ "className" in data ? data.className : ""}> {data.title}</span>  
                                                    </div>
                                                :
                                                  "TABLE_PRICE_BUTTONS" in parametros && parametros["TABLE_PRICE_BUTTONS"] == "false" ?

                                                        <button className='w-100 btn text-primary' onClick={ () => executeAction(data)}   > 
                                                            {getLabelCell(data)}
                                                        </button>
                                                    : 
                                                    <div className="row ">
                                                        <div className="col" onClick={ () => executeAction(data)}>
                                                            <button className='btn'   > 
                                                                {getLabelCell(data)}
                                                            </button>
                                                        </div>

                                                        <div className="col-auto">
                                                            <button style={{marginTop: '5px'}} onClick={ (e) => {e.preventDefault(); handleAction("editar", data.sku)} }>
                                                                <img src={editIcon}/>
                                                            </button>
                                                        </div>
                                                    </div>

                                                 
          
                                      }
  
                                  </td>
  
                              )
                         
                      }
                  </tr>
              )
              
             :
                <tr> <td> Empty</td></tr>
           }
         </tbody>   
       </table>
     
    );

}
