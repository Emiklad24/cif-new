import { Col, Collapse, Form, Input, Radio, Row, Select } from "antd";
import React from "react";
import "styles/pages/form.less";

const { Option } = Select;

const yaw = [
  "Papilloma/Papules",
  "Ulcers",
  "Macules",
  "Swelling of bones and joints",
  "Hyperkeratosis of Palms/soles",
  "None of the above",
];
const drugs = [
  "Azithromycin(no of 500mg tablets)",
  "Benzathine Ibenzylpenicillin(0.6MU OR 1.2MU)",
  "Others",
];

const ClinicalHistory = () => {
  const { Panel } = Collapse;
  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Clinical forms of Yaws"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="facility_type"
              rules={[
                {
                  required: true,
                  message:
                    "Please select First sign/symptom before the emergence of worm",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {yaw.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Photograph of Lesion"
              name="photograph"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                type="file"
                placeholder="Specify"
                id="photograph"
                name="photograph"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Treatment Given"
              name="given"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Radio.Group>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Drugs Given"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="drugs_given"
              rules={[
                {
                  required: true,
                  message: "Please select Drugs Given",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {drugs.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Others (specify)"
              name="others"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Input
                placeholder="Other (specify)"
                id="others"
                name="others"
                onChange={(e) => {}}
              />
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
