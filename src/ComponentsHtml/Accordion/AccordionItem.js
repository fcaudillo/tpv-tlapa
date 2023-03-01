import React from 'react'
import { AccordionHeader } from './AccordionHeader'
import { AccordionBody } from './AccordionBody'

export const AccordionItem = (props) => {

    return (
      <a  onClick={props.toogle}>
         
                 {props.children}
      
      </a>
       

    );

}