import { Col, Input, Collapse, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const FinalClassification = ({form}) => {
  const [formValues, setFormValues] = useState({});
  const { Panel } = Collapse;

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={16} md={16} sm={24}>
          <ClearableFormItem
            setFormValues={setFormValues}
            form={form}
            label="What is the final classification of the case?"
            name="finalClassification"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Make a selection!",
              },
            ]}
          >
            <Radio.Group
              buttonStyle="solid"
              onChange={(e) =>
                handleUpdateInputValues(e.target.name, e.target.value)
              }
              name="finalClassification"
            >
              <Radio.Button value="confirmed">Confirmed</Radio.Button>
              <Radio.Button value="presumptive positive">
                Presumptive positive
              </Radio.Button>
              <Radio.Button value="discarded">Discarded</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>

        {formValues?.finalClassification === "discarded" && (
          <Col lg={18} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Enter diagnosis"
              name="diagnosis"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input
                placeholder="Enter diagnosis"
                id="diagnosis"
                name="diagnosis"
                
              />
            </ClearableFormItem>
          </Col>
        )}
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
