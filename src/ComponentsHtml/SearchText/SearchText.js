import React, { useRef, useState, useLayoutEffect } from 'react'

import './SearchText.css'
import lupaIcon from '../../images/lupa.svg'
import closeIcon from '../../images/close.svg'
import { orange } from '@mui/material/colors'


export const SearchText = ({ name, products, categories, onChange, onSelect,  valueInput = "", placeholder = "Buscar productos por descripcion, sku y codigo barras ...", max_categories = 10, max_products = 15 }) => {

    const [display, setDisplay] = React.useState("none");
    const miDivRef = useRef(null);
    const inputRef = useRef(null);
    const divSearchRef = useRef(null);
    const [value, setValue] = useState(valueInput)
    const [isFocus, setIsFocus] = useState(false);
    var miTimeout = null;

    React.useEffect(() => {
        const newDiv = document.createElement('div');
        newDiv.style.position = 'absolute';
        newDiv.style.top = '0px';
        newDiv.style.left = '0px';
        newDiv.style.width = '100%';
        newDiv.style.visibility = 'hidden'
        document.body.appendChild(newDiv);
        miDivRef.current = newDiv;
        calcularPosicionDivOpt();
        return () => {
            document.body.removeChild(newDiv);
        };
    }, [])

    React.useEffect( () => {

        if ( isFocus && (products && products.length > 0) || (categories && categories.length > 0) ){
            setDisplay("none");
            miDivRef.current.style.visibility = "hidden";
        }

    }, products, categories)

    const handleClick = () => {
        setIsFocus(true);
        calcularPosicionDivOpt();
        miDivRef.current.style.visibility = "visible";
        setDisplay("block");
    }

    const calcularPosicionDivOpt = () => {
        const { top, left, width, height } = divSearchRef.current.getBoundingClientRect();
        if (miDivRef.current){
            miDivRef.current.style.top = (top + height) + "px";
            miDivRef.current.style.left = (left) + "px";
            miDivRef.current.style.width = (width) + "px";   
        }


    }



    const selectOption = (id) => {
        console.log("Se selecciono id = " + id)
        setDisplay("none");
        miDivRef.current.style.visibility = "hidden";

    }

    const lostFocus = () => {
        setDisplay("none");
        miDivRef.current.style.visibility = "hidden";
    }

    const initTimeOut = () => {
        setIsFocus(false)
        //Me va a permitir hacer click en la categorias o productos
        //Si no le pongo esto, el evento de seleccion no se ejecuta
        setTimeout( () => lostFocus(), 300);
    }


    const selectCategory = (category) => {
        
        console.log("entrando a selectCategory")
        const data = { category }
        setDisplay("none");
        miDivRef.current.style.visibility = "hidden";
        onSelect(data);    
   }

   const selectProduct = (product) => {
       
       console.log("entradno a selectProduct")
        const data = { products : [product]}
        setDisplay("none");
        miDivRef.current.style.visibility = "hidden";
        onSelect(data);
   }

   const mostrarTodos = () => {
        const data = { products : products}
        setDisplay("none");
        miDivRef.current.style.visibility = "hidden";
        onSelect(data);   
   }

   const sonTodosNumeros = (cadena) => {
     const patronNumeros = /^\d+$/;
     return patronNumeros.test(cadena.trim());
  }


    const renderizarComponente = () => {
        const elemento =
                <div className="custom-combobox-options" style={{ "display": display }} >
                    { categories != null && categories.length > 0 ? 
                        <div className='title-search'>
                            Categoria 
                        </div> 
                        
                        : null

                    }

                    { categories == null ? null : 
                        categories.slice(0,max_categories).map ( (category) => (
                                
                                <div  className="custom-combobox-option" onClick={() => selectCategory(category)}>
                                    <a className="card-product" >
                                        <div className="description-product" >
                                            <div>
                                                <div>

                                                    <p> 
                                                        {category.name}
                                                        <span class="highlight">&nbsp; - &nbsp; ({category.key})</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                        ))
                      
                      }

                    { products != null && products.length > 0 ? 
                        <div className="title-products title-search">
                            <div className='left-title-products'>
                                Productos 
                            </div> 
                            <div className='right-title-products'>
                                <a style={{color : orange}} onClick={() => mostrarTodos()} >
                                   <p> Mostrar todos los productos &gt; </p>
                                </a> 
                            </div>
                        </div>

                        
                        : null

                    }

                    { products == null ? null :
                       products.slice(0,max_products).map ( (product) => (
                            
                            <div  className="custom-combobox-option" onClick={() => selectProduct(product)}>
                                <a className="card-product" >
                                    <div className='image-product custom-combobox-option' >
                                        <img src={"https://www.truper.com/admin/images/ch/" + product.codigoProveedor + ".jpg"} height="32" />
                                    </div> 
                                    <div className="description-product">
                                        <div>
                                            <div>
                                                <p> {product.descripcion}</p>
                                                <p>
                                                 <span class="sku-barcode">SKU : &nbsp;  {product.codigoInterno} &nbsp; &nbsp; 
                                                   {
                                                      product.codigoBarras && product.codigoBarras != "" ?
                                                         <span>   C/B &nbsp; {product.codigoBarras} </span>
                                                      :
                                                        null
                                                   } 
                                                 </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                      ))}

            </div>;
           
        ReactDOM.render(elemento, miDivRef.current);
    };

    const onChangeSearch = (evt) => {

        setValue(evt.target.value);
        onChange(value);
    }

    function handleKeyUp(event) {
        event.preventDefault();
        const inputText = event.target.value.trim();
        if (event.keyCode === 13) {
 
          if (sonTodosNumeros(inputText)  ) {
             if (inputText.length == 3) {
                onSelect({ category : { key : inputText} })  
             }else if (inputText.length == 4) {
                onSelect({ sku : inputText }) 
             }else if (inputText.length > 4) {
                onSelect({ barcode : inputText }) 
             }
             setDisplay("none");
             miDivRef.current.style.visibility = "hidden";
          }else {
            onChange(inputText);
          }


          
        } else if (!sonTodosNumeros(inputText)  )  {
           onChange(inputText);
        }
      }

    const executeSearch = () => {
        const inputText = inputRef.current.value.trim();
        if (sonTodosNumeros(inputText)  ) {
            if (inputText.length == 3) {
               onSelect({ category : { key : inputText} })  
            }else if (inputText.length == 4) {
               onSelect({ sku : inputText }) 
            }else if (inputText.length > 4) {
               onSelect({ barcode : inputText }) 
            }
            setDisplay("none");
            miDivRef.current.style.visibility = "hidden";
         }else {
            onSelect({ description : inputText, type : "MANUAL" }) 
         }
    }
      
    const clearInput = () => {
        inputRef.current.value = "";
        setDisplay("none");
        miDivRef.current.style.visibility = "hidden";
    }

    return (
         <>
            <div ref={divSearchRef} className="custom-combobox ">
                <div  class="containerSearch">
                    <div className='left' style={{marginLeft:"10px"}}>
                      <img style={{"width": "20px", "margin-top":"6px", "height": "20px", "display":"inline-block", "cursor":"pointer"}} src={closeIcon} onClick={() => clearInput()}  />
                    </div>
                    <div className='center'>
                       <input type="text"  ref={inputRef} onKeyUp={handleKeyUp} placeholder={placeholder} name={name} className="inputSearch" onClick={() => handleClick()} onBlur={() => initTimeOut()}  minLength="1" />
                    
                    </div>
                    <div className='right' style={{marginLeft:"5px", marginRight: "3px"}}>
                      <img style={{"width": "25px", "margin-top":"3px" ,"height": "25px", "display":"inline-block", "cursor":"pointer"}} onClick={() => executeSearch()} src={lupaIcon}/>
                    </div>
                </div>

             </div>

             {
                display == "none" ? null : 
                
                renderizarComponente()
             
             
             
             }
        </>
    );
}
