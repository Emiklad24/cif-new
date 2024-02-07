import { DatePicker } from "antd";
import { DATE_FORMAT, SORMAS_UUID } from "constants/ActionTypes";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CustomDatePicker = ({
  isToday = false,
  form,
  setFormValues,
  name,
  ...otherProps
}) => {
  const [isDatePickerDisabled] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const sormasCaseUuid = urlParams.get(SORMAS_UUID);

  const { sormasCase } = useSelector(({ common }) => common);

  if (!sormasCaseUuid && !sormasCase?.applicationUuid) {
    delete otherProps.value;
    delete otherProps.onChange;
    delete otherProps.id;
    delete otherProps["aria-required"];
  }

  if (otherProps.value) {
    otherProps.value = moment(otherProps.value, DATE_FORMAT);
  }

  // set it to todays date if isToday is true, and disable the date picker, if it isnt an existing case
  if (isToday && !sormasCaseUuid && !sormasCase?.applicationUuid) {
    otherProps.value = moment();
    otherProps.disabled = true;
  }

  return (
    <DatePicker
      {...otherProps}
      name={name}
      format={DATE_FORMAT}
      disabledDate={(current) =>
        current.isAfter(moment()) || isDatePickerDisabled
      }
      style={{ width: "100%" }}
      placeholder={DATE_FORMAT}
      onChange={(_date, dateString) => {
        form.setFieldsValue({
          [name]: dateString,
        });
        // ✅ This is for local state values
        if (setFormValues) {
          setFormValues((previousState) => ({
            ...previousState,
            [name]: dateString,
          }));
        }
      }}
      disabled={isToday}
    />
  );
};

export default CustomDatePicker;
