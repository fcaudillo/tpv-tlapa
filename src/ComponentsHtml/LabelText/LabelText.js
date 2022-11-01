import React  from  'react'


const LabelText = ({ label, text} ) => {
    return (
      <div className="form-group">
        <label for="">{label ? label : 'Etiqueta'}</label>
        <label className="form-control" >{text ? text : 'texto'}</label>
      </div>      
    );
}

export default LabelText;


