/* eslint-disable no-unused-vars */
import { Col, Input, Collapse, Row, Tooltip, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../Custom/ClearableFormItem";
import CustomDatePicker from "../Custom/CustomDatePicker";

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

  const [formValues, setFormValues] = useState({});

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Contact Tracing Information" key="1">
        <Row>
          <Col lg={8} md={12} sm={24}>
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
                  message: "This field is required",
                },
              ]}
            >
              <Input
                placeholder="Enter First Name"
                id="contactFirstNameContact"
                name="contactFirstNameContact"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24}>
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
                  message: "This field is required",
                },
              ]}
            >
              <Input
                placeholder="Enter Last Name"
                id="contactLastName"
                name="contactLastName"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of birth"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfBirthOfContact"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfBirthOfContact" />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24}>
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
                  message: "This field is required",
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
                      <Input placeholder="Estimated Months" disabled />
                    </Tooltip>
                  </Col>
                </Row>
              </Input.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24}>
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
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24} xs={24}>
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
                  message: "This field is required",
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
          <Col lg={8} md={12} sm={24} xs={24}>
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
                  message: "This field is required",
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
          <Col lg={8} md={12} sm={24} xs={24}>
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
                  message: "This field is required",
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
          <Col lg={8} md={12} sm={24}>
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
                  message: "This field is required",
                },
              ]}
            >
              <Input
                placeholder="Enter Contact Address"
                id="address"
                name="address"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24}>
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
                  message: "This field is required",
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

          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact categorization"
              name="contactCategorization"
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
                <Radio.Button value="no risk">No risk</Radio.Button>
                <Radio.Button value="low risk">Low risk</Radio.Button>
                <Radio.Button value="high risk">High risk</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Health worker ?"
              name="isContactAHealthWorker"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="isContactAHealthWorker"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.isContactAHealthWorker === "yes" && (
            <Col lg={8} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Name of health facility"
                name="nameOfHwHealthFacility"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter health care facility Address"
                  id="nameOfHwHealthFacility"
                  name="nameOfHwHealthFacility"
                />
              </ClearableFormItem>
            </Col>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ContactTracing;
