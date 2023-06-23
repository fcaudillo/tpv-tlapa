import React  from  'react'

import './SearchText'

export const SearchText = ({ onChange, name, placeholder } ) => {
    
    const [display, setDisplay] = React.useState("none");
    
    React.useEffect(async () => {
       // setDisplay("none");
    },[])

    
    const handleClick = () => {
        setDisplay("block");
    }

    const selectOption = (id) => {
        console.log("Se selecciono id = " + id)
        setDisplay("none");
    }
    
    
    return (

        <div className="custom-combobox form-group">
            <input type="text" name={name} className="form-control"  onClick={() => handleClick()} placeholder={placeholder}  minLength="1"  />
            <div className="custom-combobox-options" style={{"display": display}} >
                <div className="custom-combobox-option" onClick={() => selectOption("1")}>Opción 1</div>
                <div className="custom-combobox-option" onClick={() => selectOption("2")}>Opción 2</div>
                <div className="custom-combobox-option" onClick={() => selectOption("3")}>Opción 3</div>
            </div>
        </div>
    
    );
}
