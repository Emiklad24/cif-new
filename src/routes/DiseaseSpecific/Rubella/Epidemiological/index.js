import { Col, Collapse, Form, Input, Row, Select } from "antd";
import React from "react";
import "styles/pages/form.less";

const { Option } = Select;

const facilityData = ["Federal Medical Center", "Jabi Clinic"];

const Epidemiological = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
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
          <Col lg={6} md={6} sm={12} xs={24}>
            <Form.Item
              label="Type"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="facility_type"
              rules={[
                {
                  required: true,
                  message: "Please input the facility Type!",
                },
              ]}
            >
              <Select placeholder="Select Facility Type" allowClear>
                {facilityData.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
