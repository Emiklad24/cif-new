import {
  Col,
  Collapse,
  Form,
  Radio,
  Select
} from "antd";
import React from "react";
import "styles/pages/form.less";

const finalClass = [
  "Lab confirmed",
  "Epidemiologically linked",
  "Clinically compatible",
  "Discarded",
  "Pending classification",
];
const { Option } = Select;

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
            label="Final Classification of Case"
            name="finalClassification"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              placeholder="Select Option"
              allowClear
              name="finalClassification"
            >
              {finalClass.map((item) => (
                <Option label={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label="Polio Type"
            name="polioType"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="cvpv">cVPV</Radio.Button>
              <Radio.Button value="avpv">aVPV</Radio.Button>
              <Radio.Button value="ivpv">iVPV</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col lg={12} md={12} sm={24}>
          <Form.Item
            label="Indicate serotype"
            name="serotype"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="1">1</Radio.Button>
              <Radio.Button value="2">2</Radio.Button>
              <Radio.Button value="3">3</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
