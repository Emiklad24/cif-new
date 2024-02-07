import { Col, Collapse, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import React from "react";
import "styles/pages/form.less";

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Row>
          <Col lg={24} md={12} sm={24}>
            <ClearableFormItem
              label="Final classification"
              name="finalClassification"
              form={form}
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
                <Radio.Button value="notacase">Not a Case</Radio.Button>
                <Radio.Button value="probable">Probable</Radio.Button>
                <Radio.Button value="pending">Pending</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
