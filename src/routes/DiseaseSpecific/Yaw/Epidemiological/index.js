import { Col, Collapse, Form, Input, Row } from "antd";
import React from "react";
import "styles/pages/form.less";

const Epidemiological = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Duration of illness(weeks)"
              name="duration"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                placeholder="Duration of illness(weeks)"
                id="duration"
                name="duration"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Previous treatments(if any)"
              name="previous_treatments"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                placeholder="Previous treatments(if any)"
                id="previous_treatments"
                name="previous_treatments"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Travel History"
              name="history"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                placeholder="Travel History"
                id="history"
                name="history"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
