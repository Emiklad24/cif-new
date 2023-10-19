/* eslint-disable no-unused-vars */
import { Col, Collapse, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});


  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={24} md={24} sm={24}>
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
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="laboratory confirmed">
                Laboratory confirmed
              </Radio.Button>
              <Radio.Button value="Epidemiologically Linked">
                Epidemiologically linked
              </Radio.Button>
              <Radio.Button value="Clinically Compatible">
                Clinically compatible
              </Radio.Button>
              <Radio.Button value="not a case">Not a case</Radio.Button>
              <Radio.Button value="probable">Probable</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
