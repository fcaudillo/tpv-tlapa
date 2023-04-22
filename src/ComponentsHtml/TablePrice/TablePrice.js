
import React,{ useEffect, useState }  from 'react'

import './TablePrice'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from  '../../actions'

export const TablePrice = ( props ) => {
    const dispatch = useDispatch();
    const [headers,setHeaders] = useState(props.headersProps)
    const [metadataBody,setMetadataBody] = useState(props.metadataBodyProps)
    const [data,setData] = useState(props.dataProps)
    const [categoryNormalize,setCategoryNormalize]  = useState({})
    const [active, setActive] = useState(false)

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

    
    // React.useEffect(() => {


    //      setHeaders(headersProps);
    //      setMetadataBody(metadataBodyProps);
    //      setData(dataProps);

         
    //      var normalize = {};
    //      data.forEach ( pr => {
    //         normalize[pr.codigoInterno] = pr;
    //      });
          
    //      setCategoryNormalize(normalize);
         
    //      setMetadataBody([...metadataBodyProps]);
    //      console.log ("normalize1")
    //      console.log (data)
    //      console.log (normalize)
    //      console.log(categoryNormalize);

    //  }, [headersProps, metadataBodyProps, dataProps])

    const addTicketProduct = (sku) => {
        dispatch(actions.modifyGlobalCodebar({"barcode": sku, "qty": 1,"addToTicket": 1, "addLector": false,  "date": new Date()}));
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

    const  getPriceSell = (sku) => {
       var res =  data.filter(pr => pr.codigoInterno == sku)

       if (res && res.length > 0) {
           var  x = res[0]
           return x.precioVenta;
       }

       return ""
    }
  

    return (
       <table class="table table-sm table-striped">
         <thead>
             { createHeaders(headers)}
         </thead>
         <tbody>
         {
            data && data.length > 0 
            ?
              
               metadataBody.map( (metarow, rowIdx) => 
               
                  <tr>
                      {
                          metarow.map ( (text,columnIdx) => 
                              
                                  <th className='border'>
                                      { 
                                          <div> 
                                               {
                                                 columnIdx == 0 
                                                    ?
                                                    <span> {text}</span>  
                                                 :
                                                   <a> {getPriceSell(text)} </a>
                                               }
                                              
                                          </div> 
                                      
                                      
                                      }
  
                                  </th>
  
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
