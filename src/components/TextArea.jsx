import React, { memo } from "react";
import PropTypes from "prop-types";

const TextArea = ({
  value,
  onChange,
  readOnly,
  className,
  name,
  placeholder
}) => {
  return (
    <textarea
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={className}
      name={name}
      placeholder={placeholder}
    />
  );
};
TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string
};
export default memo(TextArea);
