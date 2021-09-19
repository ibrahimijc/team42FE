import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
 
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  readOnly
}) => {
  return (

 

    
      <div  >
        <label >{label}</label>
        <div className="input-group">
          <input
          className="form-control" 
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onChange={onChange}
            readOnly={readOnly} />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
 

  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
