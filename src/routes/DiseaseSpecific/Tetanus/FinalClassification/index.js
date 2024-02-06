import { Col, Collapse, DatePicker, Form, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const FinalClassification = () => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Final Classification" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Date sample collected"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateSampleCollected"
              rules={[
                {
                  required: true,
                  message: "Select a date!",
                },
              ]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default FinalClassification;
