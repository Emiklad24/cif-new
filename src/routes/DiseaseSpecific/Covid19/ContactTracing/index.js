import { Col, Collapse, Form, Input, Radio, Row } from "antd";
import React from "react";
import "styles/pages/form.less";

const ContactTracing = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Contact Tracing Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              name="contactIdentified"
              label="Contact Identified"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an Option ",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="YES">Yes</Radio.Button>
                <Radio.Button value="NO">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
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

          <Col lg={12} md={12} sm={12}>
            <Form.Item
              label="Contact Name"
              name="contact_name"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="text text"
                id="contact_name"
                name="contact_name"
                type="text"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <Form.Item
              label="Contact Number"
              name="contact_number"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="text text"
                id="contact_number"
                name="contact_number"
                type="text"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <Form.Item
              label="Type of Contact"
              name="contact_type"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="text text"
                id="contact_type"
                name="contact_type"
                type="text"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>

          <Col lg={6} md={12} sm={24}>
            <Form.Item
              label="Contact Categorization"
              name="contact_category"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="high">high</Radio.Button>
                <Radio.Button value="medium">medium</Radio.Button>
                <Radio.Button value="low">low</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={12}>
            <Form.Item
              label="Date of contact with a confirmed case"
              name="date_contact"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Date date"
                id="date_contact"
                name="date_contact"
                type="date"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ContactTracing;
