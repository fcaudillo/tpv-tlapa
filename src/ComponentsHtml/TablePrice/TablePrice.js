
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

    
    const addTicketProduct = (sku) => {
        dispatch(actions.modifyGlobalCodebar({"barcode": sku, "qty": 1,"addToTicket": 1, "addLector": false,  "date": new Date()}));
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

    const  renderCell = (row, col, text) => {

        if (col == 0) {
            return (<> <span> {text }</span> </>)
        }

        return (
            <>
               <button type="button" class="btn btn-link" onClick={ () => addTicketProduct(text)} >
                   { text in categoryNormalize ? categoryNormalize[text].precioVenta : "" }
               </button>
           </>
        );

    }

    const  getPriceSell = (cell) => {
       var res =  data.filter(pr => pr.codigoInterno == cell.sku)

       if (res && res.length > 0) {
           var  x = res[0]
           return x.precioVenta;
       }

       return ""
    }
  

    return (
        
       <table class="table table-sm table-striped">
         <thead  className="thead-light">
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

                                                        <button className='w-100 btn text-primary' onClick={ () => addTicketProduct(data.sku)}   > 
                                                            {getPriceSell(data)}
                                                        </button>
                                                    : 
                                                    <div className="row ">
                                                        <div className="col" onClick={ () => addTicketProduct(data.sku)}>
                                                            <button className='btn'   > 
                                                                {getPriceSell(data)}
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
