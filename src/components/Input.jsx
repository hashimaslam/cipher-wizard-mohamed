import React, { memo } from "react";
import PropTypes from "prop-types";
const Input = ({ shift, handleChange }) => {
  return (
    <input
      name="shift"
      value={shift}
      onChange={handleChange}
      style={{ width: "5%" }}
    />
  );
};

Input.propTypes = {
  shift: PropTypes.number,
  handleChange: PropTypes.func
};

export default memo(Input);
