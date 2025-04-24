import React, { useRef } from 'react'
import './MenuCategory.css'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions'
import * as funcs from '../../bussiness'

export const MenuCategory = ({ category, openModal, setOpenModal, offsetLeft, height }) => {
    const [open, setOpen ] = React.useState(false);
    const [subcategory, setSubcategory] = React.useState(null);
    const [idCatSelected, setIdCatSelected] = React.useState('id0');
    const dispatch = useDispatch()
    const divMain = useRef(null);
    const [timeoutId, setTimeoutId] = React.useState(null);

    React.useEffect( () => {
       
        console.log("Se cambio de categoria principal")
        if (category && 'name' in category){
            setSubcategory(null);
            setIdCatSelected('id0');
        }

        if (timeoutId != null) {
            console.log("Limpiando el timeout")
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }else {
            console.log("Se supone no debe imprimir esto")
        }

    },[category])

    React.useEffect( () => {
       setOpen(openModal)
       if (openModal) {
          setTimeout( () => {
            //divMain.current.style.left = (offsetLeft) + "px";
            //divMain.current.style.top = (divMain.current.style.top + height) + "px";
            divMain.current.focus();
          },500)
          
       }

    },[openModal])

    const changeSubcategoty = (cat) => {
        openCategorySubcategory(cat,subcategory);
   }

   const openCategorySubcategory = (cat, subcategory) => {
        if (subcategory != null ){
            dispatch(funcs.showSubcategories(subcategory.categories,cat, 'subcategoriesBusqueda'));   
        }
        console.log("Buscar category : " + cat.name + " key: " + cat.key)
        dispatch(actions.modifyGlobalCodebar({"barcode": cat.key, "qty": 1, "date": new Date()}));
        setOpenModal(false);
        setIdCatSelected('id0');
        setSubcategory(null);
   }

    const  showSubcategory = (subcat, sourceEvent) => {
       console.log("Subcategory : " + subcat.name);
       var id = 'id'+subcat.id;
       if (idCatSelected != id) {
            var elementClear = document.getElementById(idCatSelected);
            if (elementClear != null) {
                elementClear.style.backgroundColor = 'white';
                elementClear.style.borderLeft = '0px';
                elementClear.style.fontWeight = 'normal'
            }

       }

       var element = document.getElementById(id);
       if (element != null) {
          element.style.backgroundColor = 'hsl(210, 79%, 95%)';
          element.style.borderLeft = '4px solid #0071dc';
          element.style.fontWeight = 'bold';
          setIdCatSelected(id);
       }
       
       if ('categories' in subcat && subcat.categories.length == 0 && sourceEvent == 'onClick') {
           openCategorySubcategory(subcat,category);
           return;
       }

       if (sourceEvent == 'onMouseOver') {
          setSubcategory(subcat)
       }
       
    }

    const hideModal = () => {
        console.log("intentando ocultar")
        const id = setTimeout(() => {
           setOpenModal(false);
           console.log("Se oculto el modal;")
          } 
        , 300)
        setTimeoutId(id);
    }

    return ( 
        <>
            { open && category != null  ? 
                <div ref={divMain} id="menuContainer" style={{top: height, left: offsetLeft}} onBlur={() => hideModal() } tabIndex="0">
                    
                    <div className='category'>
                        <p style={{fontSize:'14px', padding:'8px', fontWeight:'bold'}}> {category.name}</p>
                        <ul> 
                            {
                                category.categories.map( (subcat) => 
                                  <li onMouseOver={() => showSubcategory(subcat,'onMouseOver')} onClick={() => showSubcategory(subcat,'onClick')}  key={'cat' + subcat.id} id={'id' + subcat.id}> 
                                     <span> {subcat.name} </span>
                                  </li>

                                )
                            }
                        </ul> 
                    </div> 
                    {
                        subcategory && 'categories' in subcategory && subcategory.categories.length > 0 ? 
                            <section class="subcategory"  >
                            
                                <ul> 
                                   <p style={{fontSize:'14px', padding:'8px', fontWeight:'bold'}}> {subcategory.name}</p>
                                    {
                                            subcategory.categories.map( (subcat) => 
                                              <li  onClick={() => changeSubcategoty(subcat)} > 
                                                <span key={'sucat' + subcat.id} href='#'> {subcat.name} </span>
                                              </li>

                                            )
                                    }

                                </ul>
    
                            </section>
                        : null
                    }

                </div>
            
            : null
            }
        </>
    );


}