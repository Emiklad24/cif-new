/* eslint-disable no-unused-vars */
import { Col, Collapse, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const { Option } = Select;

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  const finalClassificationOptions = ["Epidemiologically Link", "Discarded"];
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={12} md={12} sm={24}>
          <ClearableFormItem
            form={form}
            setFormValues={setFormValues}
            label="Final classification"
            name="finalClassification"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid" name="specimenCollected">
              {finalClassificationOptions.map((item) => (
                <Radio.Button value={item} key={item}>
                  {item}
                </Radio.Button>
              ))}
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
