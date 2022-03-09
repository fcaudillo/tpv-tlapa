import React  from  'react'


const TextInput = ({ label, value,  onChange, name, error } ) => {
    return (
      <div className="form-group">
        <label for="">{label ? label : 'Etiqueta'}</label>
        <input type="text" name={name} className="form-control" id="" placeholder="" onChange={ onChange } minLength="1" value={value} />
         {typeof(error) != 'undefined' && error != null && <p>{error}</p> }
      </div>      
    );
}

export default TextInput;


