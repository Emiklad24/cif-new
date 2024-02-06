import { Col, Collapse, Form, Radio } from "antd";
import React from "react";
import "styles/pages/form.less";

const FinalClassification = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label="Final Classification"
            name="finalClassification"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Fill this field!",
              },
            ]}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="confirmed">Confirmed</Radio.Button>
              <Radio.Button value="not a case">Not a case</Radio.Button>
              <Radio.Button value="probable">Probable</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
