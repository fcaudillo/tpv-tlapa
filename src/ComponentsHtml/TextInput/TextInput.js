import React  from  'react'


const TextInput = ({ label, value,  onChange, name, error, type = 'text' } ) => {
    return (
      <div className="form-group">
        <label for="">{label ? label : 'Etiqueta'}</label>
        <input type={type} name={name} className="form-control" id="" placeholder="" onChange={ onChange } minLength="1" value={value} >
        </input>
         {typeof(error) != 'undefined' && error != null && <p>{error}</p> }
      </div>      
    );
}

export default TextInput;


