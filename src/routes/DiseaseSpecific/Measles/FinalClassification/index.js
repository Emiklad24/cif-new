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
        <Col lg={24} md={24} sm={12} xs={24}>
          <ClearableFormItem
          form={form}
          setFormValues={setFormValues}
            label="Final classification"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="finalClassification"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="laboratoryConfirmed">Laboratory Confirmed</Radio.Button>
              <Radio.Button value="epidemiologicallyLinked">Epidemiologically Linked</Radio.Button>
              <Radio.Button value="clinicallyCompatible">Clinically Compatible</Radio.Button>
              <Radio.Button value="discardedNotACase">Discarded/Not a Case</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </ClearableFormItem>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;