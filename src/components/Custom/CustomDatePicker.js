import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";

const CustomDatePicker = ({ form, name, ...rest }) => {
  const [isDatePickerDisabled] = useState(false);
  return (
    <DatePicker
      name={name}
      format="DD-MM-YYYY"
      disabledDate={(current) =>
        current.isAfter(moment()) || isDatePickerDisabled
      }
      style={{ width: "100%" }}
      placeholder="DD-MM-YYYY"
      onChange={(_, dateString) =>
        form.setFieldsValue({
          [name]: dateString,
        })
      }
      {...rest}
    />
  );
};

export default CustomDatePicker;