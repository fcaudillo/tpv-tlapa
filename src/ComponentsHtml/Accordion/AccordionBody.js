import React from 'react' 
import  './AccordionBody.css'

export const AccordionBody = (props) => {
   const [open, setOpen] = React.useState(props.open)
   
   React.useEffect(() => {
      console.log("open = " + props.open)
      setOpen(props.open);
   }, [props.open])
   
   return (
     (open ?
        
        <div className='accordion-panel'>

         {props.children}

       </div>
    : null  
        
    ) 
     

   );

}