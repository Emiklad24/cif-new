import { Col, Collapse, Form, Radio, Row } from "antd";
import React from "react";
import "styles/pages/form.less";

const FinalClassification = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Row>
          <Col lg={24} sm={24}>
            <Form.Item
              label="Final Classification"
              name="finalClassification"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="confirmed">Confirmed</Radio.Button>
                <Radio.Button value="probable">Probable</Radio.Button>
                <Radio.Button value="notacase">Not a Case</Radio.Button>
                <Radio.Button value="pending">Pending</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
