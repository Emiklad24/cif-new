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
                name="contactFirstName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this Field!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter First Name"
                  id="contactFirstName"
                  name="contactFirstName"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Contact Middle Name"
                name="contactMiddleName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this Field!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Middle Name"
                  id="contactMiddleName"
                  name="contactMiddleName"
                  onChange={(e) => {}}
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
                    message: "Fill this Field!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Last Name"
                  id="contactLastName"
                  name="contactLastName"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of Birth"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_date ? moment(sample_date) : null}
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Select a Date!",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                tooltip="Estimated age in years and months"
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Enter a Date!",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                label="Phone Number"
                // initialValue={phone}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Enter Phone Number",
                  },
                ]}
              >
                <Input
                  type="phone"
                  size="large"
                  // onChange={(e) => setPhone(e.target.value)}
                />
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
                    message: "Select an Option!",
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
                name="contactLgaOfResidence"
                rules={[
                  {
                    required: true,
                    message: "Select an Option!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  placeholder={<>&nbsp; Select LGA</>}
                >
                  {lga.map((item) => (
                    <Option label={item} value={item}>
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
                    message: "Select an Option!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  placeholder={<>&nbsp; Select Ward</>}
                >
                  {lga.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Contact Residential Address"
                name="contactResidentialAddress"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter Address"
                  id="contactResidentialAddress"
                  name="contactResidentialAddress"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default ContactTracing;
