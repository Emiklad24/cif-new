import { Col, Collapse, Form, Input } from "antd";
import React from "react";
import "styles/pages/form.less";

const FinalClassification = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={6} md={6} sm={24}>
          <Form.Item
            label="Complete Address"
            name="clientaddress"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              placeholder="Enter Address"
              id="address"
              name="address"
              onChange={(e) => {}}
            />
          </Form.Item>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
