/* eslint-disable no-unused-vars */
import { Col, Input, Collapse, Row, Tooltip, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

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

const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const ContactTracing = ({ form }) => {
  const [lga, setLga] = useState([]);
  const { Panel } = Collapse;

  const [_, setFormValues] = useState({});

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Contact Tracing Information" key="1">
        <Row>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact first name"
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
                onChange={(e) => {}}
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact last name"
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
                onChange={(e) => {}}
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of birth"
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
              <CustomDatePicker form={form} name="contactDateOfBirth" />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              tooltip="Estimated age in years and months"
              label="Contact age"
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
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact sex"
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
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={12} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact state of residence"
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
                  <Option label={item} value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact LGA of residence"
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
                  <Option key={item} label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={12} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact ward of residence"
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
                  <Option key={item} label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact residential address "
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
                onChange={(e) => {}}
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Relationship with case"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="relationshipWithCase"
              rules={[
                {
                  required: true,
                  message: "Select Relationship!",
                },
              ]}
            >
              <Select showSearch allowClear optionLabelProp="label">
                {relationshipWithCase?.map((item, i) => (
                  <Option key={item} label={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ContactTracing;
