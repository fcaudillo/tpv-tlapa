import React from 'react'
import { AccordionHeader } from './AccordionHeader'
import { AccordionBody } from './AccordionBody'

export const AccordionItem = (props) => {

    return (
      <div  onClick={props.toogle}>
         
                 {props.children}
      
      </div>
       

    );

}