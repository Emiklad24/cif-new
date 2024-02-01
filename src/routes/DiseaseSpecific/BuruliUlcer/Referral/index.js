import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const { Option } = Select;
const nameOfTestingLaboratory = [
  "National Refrence Laboratory (NRL)",
  "Central Public Health Laboratory (CPHL)",
];

const Referral = ({ form }) => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Refferal" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Treatment"
              name="treatment"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="treatment"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          {formValues?.treatment === "yes" && (
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="If Yes, Name Of Facility"
                name="specifyNameOfFacility"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Specify Facility" onChange={(e) => {}} />
              </Form.Item>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="State Of Residence"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="stateOfResidence"
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                onChange={nameOfTestingLaboratory}
              >
                {nameOfTestingLaboratory.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="LGA Of Residence"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="lgaOfResidence"
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                onChange={nameOfTestingLaboratory}
              >
                {nameOfTestingLaboratory.map((item) => (
                  <Option label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Referral Date"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="referralDate"
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
export default Referral;
