import React from 'react'
import './Accordion'

export const Accordion = (props) => {

    return (
       <div className='accordion'>
            { props.children }      
       </div>
    );

}
