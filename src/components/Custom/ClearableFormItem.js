import { Form } from "antd";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useFormStore from "../../store/useFormStore";

const ClearableFormItem = ({
  name,
  setFormValues,
  children,
  form,
  collectFormName,
  ...rest
}) => {
  const { populateLabFormName, expungeFormName } = useFormStore(
    useShallow((state) => ({
      populateLabFormName: state.populateLabFormName,
      expungeFormName: state.expungeFormName,
    }))
  );

  useEffect(() => {
    const initialValues = form.getFieldValue(name);

    form.setFieldsValue({ [name]: initialValues });

    if (collectFormName && name) {
      populateLabFormName(name);
    }

    return () => {
      if (collectFormName && name) {
        expungeFormName(name);
      }
      form.setFieldsValue({ [name]: undefined });
      if (setFormValues && typeof setFormValues === "function") {
        setFormValues((previousState) => ({
          ...previousState,
          [name]: undefined,
        }));
      }
    };
  }, [
    collectFormName,
    form,
    name,
    populateLabFormName,
    expungeFormName,
    setFormValues,
  ]);

  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      {...rest}
    >
      {children}
    </Form.Item>
  );
};

export default ClearableFormItem;
