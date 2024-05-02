import { Col, Collapse, Form, Select } from "antd";
import React from "react";
import "styles/pages/form.less";

const { Option } = Select;

const classifications = ["Suspected Case", "Confirmed Case", "Not a Yaws Case"];

const FinalClassification = () => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Col lg={12} md={6} xs={24}>
          <Form.Item
            label="Final Classification"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            name="finalClassification"
            rules={[
              {
                required: true,
                message: "Please select the Final Classification",
              },
            ]}
          >
            <Select placeholder="Select Option" allowClear>
              {classifications.map((item) => (
                <Option label={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
