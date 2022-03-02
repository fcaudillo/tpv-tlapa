import React, { forwardRef } from 'react'


const Select = forwardRef((props, ref)  => {
    const {label, onChange, options} = props
     return (
        <div className="form-group">
          <label for="">{label ? label : 'Titulo'}</label>
          <select ref={ref} className="form-control" id=""  onChange={ onChange }>
            {options ? options.map((option) => <option value={option.value}>{option.label}</option>) : <option value=''>define option values</option>}
          </select>
        </div>
      );
})

export default Select;