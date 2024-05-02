import { Col, Form, Collapse, DatePicker, Row } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import moment from "moment";

const LaboratoryInformation = ({form}) => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Date of response for supplemental"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfresponseForSupplement"
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
export default LaboratoryInformation;
