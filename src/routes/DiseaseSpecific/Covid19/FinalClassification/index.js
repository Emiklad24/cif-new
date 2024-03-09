/* eslint-disable no-unused-vars */
import { Col, Collapse, Radio } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import React, { useState } from "react";
import "styles/pages/form.less";

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [formValues, setFormValues] = useState({});

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={24} sm={24}>
          <ClearableFormItem
            label="Final classification"
            name="finalClassification"
            form={form}
            setFormValues={setFormValues}
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
              <Radio.Button value="confirmed">Confirmed</Radio.Button>
              <Radio.Button value="probable">Probable</Radio.Button>
              <Radio.Button value="notAcase">Not a Case</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
              <Radio.Button value="not_done">Not Done</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
