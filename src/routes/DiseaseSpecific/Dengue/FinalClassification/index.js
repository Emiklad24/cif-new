import { Col, Collapse, Form, Radio } from "antd";
import React from "react";
import "styles/pages/form.less";

const FinalClassification = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={12} md={12} sm={24}>
          <Form.Item
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
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="suspect">Suspect</Radio.Button>
              <Radio.Button value="confirmed">Confirmed</Radio.Button>
              <Radio.Button value="presumptive positive">
                Presumptive positive
              </Radio.Button>
              <Radio.Button value="discarded">Discarded</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
