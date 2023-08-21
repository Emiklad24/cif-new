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
                name="firstNameContact"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the residence state!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter First Name"
                  id="address"
                  name="address"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Contact Last Name"
                name="lastName"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input the residence state!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Last Name"
                  id="lastName"
                  name="lastName"
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
                    message: "Fill this field!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="YYYY-MM-DD"
                />
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
                    message: "Please input phone number",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                tooltip="Estimated age in years and months"
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Please input the residence state!",
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
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="State of Residence"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="residence_state"
                rules={[
                  {
                    required: true,
                    message: "Please input the residence state!",
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
                label="LGA of Residence"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="patient_residence_lga"
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
                label="Ward of Residence"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="patient_residence_ward"
                rules={[
                  {
                    required: true,
                    message: "Please input the residence Ward!",
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
            <Col lg={12} md={12} sm={24}>
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
                  onChange={relationshipWithCase}
                >
                  {relationshipWithCase.map((item) => (
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
    </>
  );
};
export default ContactTracing;
