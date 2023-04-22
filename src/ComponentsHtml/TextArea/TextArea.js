import React  from  'react'


const TextArea = ({ label, value,  onChange, name, error, rows=3, cols=40 } ) => {
    return (
      <div className="form-group">
        <label for="">{label ? label : 'Etiqueta'}</label>
        <textarea type="text" rows={rows} cols={cols} name={name} className="form-control" id="" placeholder="" onChange={ onChange } minLength="1" value={value} />
         {typeof(error) != 'undefined' && error != null && <p>{error}</p> }
      </div>      
    );
}

export default TextArea;