import {
  Col,
  Form,
  Input,
  Collapse,
  DatePicker,
  Row,
  Tooltip,
  Select,
  Radio,
} from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import moment from "moment";

const { Option } = Select;

const relationshipWithCase = [
  "Parent",
  "Sibling",
  "Child",
  "Neighbour",
  "Work/School Colleague",
  "Healthcare giver",
  "Patient",
  "Others",
];

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const diseaseData = ["COVID-19", "Cholera", "Yellow Fever"];

const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const ContactTracing = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Contact Tracing Information" key="1">
          <Row>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Contact First Name"
                name="contactFirstNameContact"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Enter Contact First Name!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter First Name"
                  id="address"
                  name="address"
                  onChange={(e) => { }}
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Contact Last Name"
                name="contactLastName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Enter Contact Last Name!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Last Name"
                  id="lastName"
                  name="lastName"
                  onChange={(e) => { }}
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of Birth"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_date ? moment(sample_date) : null}
                name="contactDateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                tooltip="Estimated age in years and months"
                label="Contact Age"
                rules={[
                  {
                    required: true,
                    message: "Enter age!",
                  },
                ]}
              >
                <Input.Group size="large">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Tooltip
                        placement="topLeft"
                        title="Estimated Years"
                        arrowPointAtCenter
                      >
                        <Input
                          // value={age_year}
                          // onChange={onChangeYear}
                          placeholder="Estimated Years"
                        // disabled={isYearDisabled}
                        />
                      </Tooltip>
                    </Col>
                    <Col span={12}>
                      <Tooltip
                        placement="topLeft"
                        title="Estimated Months"
                        arrowPointAtCenter
                      >
                        <Input
                          // onChange={onChangeMonth}
                          // value={age_month}
                          placeholder="Estimated Months"
                          disabled
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Contact Sex"
                name="contactSex"
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
                  <Radio.Button value="male">Male</Radio.Button>
                  <Radio.Button value="female">Female</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Contact State of Residence"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="contactStateOfResidence"
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
                  placeholder={<>&nbsp; Select State</>}
                  onChange={handleStateChange}
                >
                  {stateData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Contact LGA of Residence"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="contatcLgaOfResidence"
                rules={[
                  {
                    required: true,
                    message: "Fill this field!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  placeholder={<>&nbsp; Select LGA</>}
                >
                  {lga.map((item, i) => (
                    <Option key={i} label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Contact Ward of Residence"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="contactWardOfResidence"
                rules={[
                  {
                    required: true,
                    message: "Please select an option",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  placeholder={<>&nbsp; Select Ward</>}
                >
                  {lga.map((item, i) => (
                    <Option key={i} label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Contact Residential Address "
                name="contactResidentialAddress"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select Relationship!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Contact Address"
                  id="address"
                  name="address"
                  onChange={(e) => { }}
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Relationship with Case"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="relationshipWithCase"
                rules={[
                  {
                    required: true,
                    message: "Select Relationship!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                >
                  {relationshipWithCase.map((item, i) => (
                    <Option key={i} label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default ContactTracing;
