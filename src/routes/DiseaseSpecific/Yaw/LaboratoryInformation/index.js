import { Col, Collapse, Form, Row, Select } from "antd";
import React from "react";
import "styles/pages/form.less";

const { Option } = Select;

const sample = [
  "Finger prick blood for Trep. POC",
  "Finger prick blood for DPP POC",
  "Swab/scraping from lesions for PCR",
];
const poc = ["Positive", "Negative", "Not done"];
const pcr = ["Positive", "Negative", "Not done"];
const dpp = ["Positive", "Negative", "Not done"];
const dual = ["Positive", "Negative", "Not done"];

const LaboratoryInformation = () => {
  const { Panel } = Collapse;
  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Sampling Methods"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="specimen_type"
              rules={[
                {
                  required: true,
                  message: "Please select Sampling Methods",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {sample.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="Treponemal POC Test"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="poc_test"
              rules={[
                {
                  required: true,
                  message: "Please select Treponemal POC Test",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {poc.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="PCR Result"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="pcr_result"
              rules={[
                {
                  required: true,
                  message: "Please select PCR Result",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {pcr.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="DPP dual POC treponemal line/TPHA"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="specimen_type"
              rules={[
                {
                  required: true,
                  message: "Please select DPP dual POC treponemal line/TPHA",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {dpp.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={6} xs={24}>
            <Form.Item
              label="DPP dual POC non-treponemal line/RPR"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
              name="specimen_type"
              rules={[
                {
                  required: true,
                  message:
                    "Please select DPP dual POC non-treponemal line/RPR",
                },
              ]}
            >
              <Select placeholder="Select Option" allowClear>
                {dual.map((item) => (
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
export default LaboratoryInformation;
