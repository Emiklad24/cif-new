import {
  Col,
  Collapse,
  Form,
  Select
} from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";

const { Option } = Select;

const finals = [
  "Lab confirmed Anthrax",
  "Epidemiologically linked Anthrax",
  "Clinically compatible Anthrax",
  "Discarded",
  "Pending classification",
];

const FinalClassification = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label="Select the final classification of this case:"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="finalClassification"
            rules={[
              {
                required: true,
                message: "Please select",
              },
            ]}
          >
            <Select
              placeholder="Select Option"
              allowClear
              name="finalClassification"
              onChange={(value) =>
                handleUpdateInputValues("finalClassification", value)
              }
            >
              {finals.map((item) => (
                <Option label={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
