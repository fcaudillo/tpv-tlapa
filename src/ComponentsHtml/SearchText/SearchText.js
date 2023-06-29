import React, { useRef, useState } from 'react'

import './SearchText.css'
import lupaIcon from '../../images/lupa.svg'
import closeIcon from '../../images/close.svg'


export const SearchText = ({ name, valueInput = "", placeholder = "vacio" }) => {

    const [display, setDisplay] = React.useState("none");
    const miDivRef = useRef(null);
    const inputRef = useRef();
    const divSearchRef = useRef();
    const [value, setValue] = useState(valueInput)

    React.useEffect(async () => {
        const newDiv = document.createElement('div');
        newDiv.style.position = 'absolute';
        newDiv.style.top = '0px';
        newDiv.style.left = '0px';
        newDiv.style.width = '100%';
        newDiv.style.visibility = 'hidden'
        document.body.appendChild(newDiv);
        miDivRef.current = newDiv;

        return () => {
            document.body.removeChild(newDiv);
        };
    }, [])


    const handleClick = () => {
        //setDisplay("block");
       
        const { top, left, width, height } = divSearchRef.current.getBoundingClientRect();


        //alert("alerta maxima")
        miDivRef.current.style.top = (top + height) + "px";
        miDivRef.current.style.left = (left) + "px";
        //miDivRef.current.sytle.left = left + "px";
        miDivRef.current.style.width = (width) + "px";
        miDivRef.current.style.visibility = "visible";
        setDisplay("block");
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



    const renderizarComponente = () => {
        const elemento =
                <div className="custom-combobox-options" style={{ "display": display }} >
                     <div  className="custom-combobox-option">
                        <a href="./Conexiones-De-Cobre-FOSET-COPPERFLOW-132.html#image-2">
                            <div style={{"background":"transparent"}}>
                                <img style={{"background":"transparent"}} src="https://www.truper.com/admin/images/ch/49714.jpg" height="32" />
                            </div> 
                            <div class="de  scrip">
                                <div>
                                    <div>
                                        <p> codo 90</p>
                                        <p>
                                        <span class="highlight"></span>49714<span className="blank">|</span><span className="highlight"></span>CC-561
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
            </div>;
        ReactDOM.render(elemento, miDivRef.current);
    };

    const onChange = (evt) => {

        setValue(evt.target.value);
    }

    return (
         <>
            <div ref={divSearchRef} className="custom-combobox ">
                <div  class="containerSearch">
                    <div className='left' style={{marginLeft:"10px"}}>
                      <img style={{"width": "20px", "margin-top":"6px", "height": "20px", "display":"inline-block", "cursor":"pointer"}} src={closeIcon} onClick={() => setValue("")}  />
                    </div>
                    <div className='center'>
                       <input type="text"  ref={inputRef} onChange={onChange} placeholder="codigo2" value={value} name={name} className="inputSearch" onClick={() => handleClick()} onBlur={() => lostFocus()} minLength="1" />
                    
                    </div>
                    <div className='right' style={{marginLeft:"5px", marginRight: "3px"}}>
                      <img style={{"width": "25px", "margin-top":"3px" ,"height": "25px", "display":"inline-block", "cursor":"pointer"}} src={lupaIcon}/>
                    </div>
                </div>

             </div>
            {display == "none" ? null : renderizarComponente()}
        </>
    );
}
