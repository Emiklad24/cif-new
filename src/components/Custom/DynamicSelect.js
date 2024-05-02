import { Select } from "antd";
import React from "react";

const { Option } = Select;

const DynamicSelect = ({
  options,
  labelProperty,
  valueProperty,
  ...otherProps
}) => {

  return (
    <Select
      {...otherProps}
    >
      {options?.map?.((option, index) => (
        <Option
          key={option?.name || option?.id || index}
          value={option[valueProperty || "id"]}
          label={option[labelProperty || "name" || "value"]}
        >
          {option[labelProperty || "name" || "value"]}
        </Option>
      ))}
    </Select>
  );
};

export default DynamicSelect;
