/* eslint-disable no-unused-vars */
import { Col, Collapse, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const FinalClassification = ({ form }) => {
  const [formValues, setFormValues] = useState({});

  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={24} md={24} sm={24}>
          <ClearableFormItem
            setFormValues={setFormValues}
            form={form}
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
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="labConfirmed">
                Laboratory confirmed
              </Radio.Button>
              <Radio.Button value="probable">Probable</Radio.Button>
              <Radio.Button value="notACase">Not a case</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
