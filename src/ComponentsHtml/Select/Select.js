import React, { forwardRef } from 'react'


const Select = forwardRef((props, ref)  => {
    const {label, onChange, options, value} = props
     return (
        <div className="form-group">
          <label htmlFor="">{label ? label : 'Titulo'}</label>
          <select ref={ref} className="form-control" value={value || ''} onChange={onChange}>
            {options ? options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            )) : <option value=''>define option values</option>}
          </select>
        </div>
      );
})

export default Select;