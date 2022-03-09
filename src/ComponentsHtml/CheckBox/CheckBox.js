import React from 'react'

const CheckBox = ({label, checked, onChange}) => {

    return (
      <div className="form-group">
        <label for="">{label ? label : 'Etiqueta'}</label>
        <input type="checkbox" name={name} className="form-control" onChange={ onChange } minLength="1" checked={checked} />
         {typeof(error) != 'undefined' && error != null && <p>{error}</p> }
      </div>  

    )
}

export default CheckBox;