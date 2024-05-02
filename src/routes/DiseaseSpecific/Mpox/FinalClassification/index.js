/* eslint-disable no-unused-vars */
import { Col, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const FinalClassification = ({ form }) => {
  const { Panel } = Collapse;

  const [_, setFormValues] = useState({});

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Final classification"
              name="finalClassification"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="confirmed">Confirmed</Radio.Button>
                <Radio.Button value="probable">Probable</Radio.Button>
                <Radio.Button value="notacase">Not a Case</Radio.Button>
                {/* <Radio.Button value="probable">Probable</Radio.Button> */}
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
