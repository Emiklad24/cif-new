import React, { useEffect } from "react";
import { Form } from "antd";

const ClearableFormItem = ({
  name,
  setFormValues,
  children,
  form,
  ...rest
}) => {
  useEffect(() => {
    const initialValues = form.getFieldValue(name);
    form.setFieldsValue({ [name]: initialValues });

    return () => {
      form.setFieldsValue({ [name]: undefined });
      if (setFormValues && typeof setFormValues === "function") {
        setFormValues((previousState) => ({
          ...previousState,
          [name]: undefined,
        }));
      }
    };
  }, [form, name, setFormValues]);

  return (
    <Form.Item name={name} shouldUpdate={true} {...rest}>
      {children}
    </Form.Item>
  );
};

export default ClearableFormItem;
