import React from "react";
import { Radio } from "antd";
import { isArray } from "lodash";

const DynamicRadio = ({
  options,
  labelProperty,
  valueProperty,
  ...otherProps
}) => {
  return (
    <Radio.Group
      buttonStyle="solid"
      // disabled={!options || !isArray(options) || options?.length === 0}
      {...otherProps}
    >
      {options?.map?.((option, index) => (
        <Radio.Button
          key={option?.name || option?.id || index}
          value={option[valueProperty || "id"]}
        >
          {option[labelProperty || "name" || "value"]}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export default DynamicRadio;
