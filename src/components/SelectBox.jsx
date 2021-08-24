import React, { memo } from "react";
import PropTypes from "prop-types";

const SelectBox = ({ selectedCiper, handleChange }) => {
  return (
    <select
      name="selectedCiper"
      value={selectedCiper}
      onChange={handleChange}
      className="selectBox"
    >
      <option value="rot13">rot13</option>
      <option value="rotN">rotN</option>
      <option value="base64">base64</option>
    </select>
  );
};
SelectBox.propTypes = {
  selectedCiper: PropTypes.string,
  handleChange: PropTypes.func
};
export default memo(SelectBox);
