import React from 'react'
import {Chevron, CloseFolder, OpenFolder} from "./icons";
import './AccordionHeader.css'

export const AccordionHeader = (props) => {

    const [open,setOpen] = React.useState(props.open)
    const [active, setActive] = React.useState(false)

    React.useEffect(() => {
        setOpen(props.open);
     }, [props.open])

    React.useEffect(() =>{
        setActive(props.active)
        console.log("activo accordioheader = " + active)
    }, [props.active])

    return (
       <div>
           <button  type="button" className={`${active ? 'accordion-title-active': 'accordion-title'} `}  onClick={props.toogle}>
                    <span>                         
                        { open ? <OpenFolder /> : <CloseFolder />}
                       <span>{ props.title }</span> 
                    </span>
           </button>

       </div>

    );

}