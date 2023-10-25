import React from "react";
import { Select } from "antd";
import { isArray } from "lodash";

const { Option } = Select;

const DynamicSelect = ({
  options,
  labelProperty,
  valueProperty,
  ...otherProps
}) => {
  return (
    <Select
      disabled={!options || !isArray(options) || options?.length === 0}
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
