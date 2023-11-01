/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Col, Input, Collapse, Row, Tooltip, Select, Radio } from "antd";
import React, { useEffect, useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../Custom/ClearableFormItem";
import CustomDatePicker from "../Custom/CustomDatePicker";
import DynamicSelect from "../Custom/DynamicSelect";
import useFetchAllStates from "../../hooks/useFetchAllStates.hooks";
import useFetchAllLGA from "../../hooks/useFetchLga.hook";
import useFetchWard from "../../hooks/useFetchWard.hook";

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
  const [ageYear, setAgeYear] = useState(0);
  const [ageMonth, setAgeMonth] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLga, setSelectedLga] = useState(null);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const getDoBFromAge = (arg) => {
    if (arg) {
      const parts = arg.split("-");
      if (parts.length !== 3) {
        throw new Error("Invalid date format. Please use DD-MM-YYYY.");
      }

      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const dob = new Date(year, month, day);
      const today = new Date();
      let ageYear = today.getFullYear() - dob.getFullYear();
      let ageMonth = today.getMonth() - dob.getMonth();

      if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < dob.getDate())) {
        ageYear--;
        ageMonth += 12;
      }
      setAgeMonth(ageMonth);
      setAgeYear(ageYear);

      form.setFieldsValue({
        age: ageYear,
      });

      return { ageYear, ageMonth };
    }
    return 0;
  };

  const handleStateChange = (value, name) => {
    setSelectedState((previousState) => ({
      ...previousState,
      [name]: value,
    }));

    if (name === "contactStateOfResidence") {
      setSelectedLga(null);
      form.setFieldsValue({
        contactLgaOfResidence: null,
        contactWardOfResidence: null,
      });
    }
  };

  const handleLgaChange = (value, name) => {
    setSelectedLga((previousState) => ({
      ...previousState,
      [name]: value,
    }));

    if (name === "contactLgaOfResidence") {
      form.setFieldsValue({
        contactWardOfResidence: null,
      });
    }
  };

  useEffect(() => {
    getDoBFromAge(formValues?.dateOfBirthOfContact);
  }, [formValues]);

  const { data: allStates } = useFetchAllStates();
  const lgaOfResidenceQuery = useFetchAllLGA(
    selectedState?.contactStateOfResidence
  );
  const wardOfResidenceQuery = useFetchWard(selectedLga?.contactLgaOfResidence);

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
              <CustomDatePicker
                form={form}
                name="dateOfBirthOfContact"
                setFormValues={setFormValues}
              />
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
              name="contactEstimatedAge"
              
            >
              <Input.Group size="large">
                <Row gutter={8}>
                  <Col span={12}>
                    <Tooltip
                      placement="topLeft"
                      title="Estimated years"
                      arrowPointAtCenter
                    >
                      <Input
                        value={ageYear}
                        // onChange={onChangeYear}
                        placeholder="Estimated Years"
                        disabled
                      />
                    </Tooltip>
                  </Col>
                  <Col span={12}>
                    <Tooltip
                      placement="topLeft"
                      title="Estimated months"
                      arrowPointAtCenter
                    >
                      <Input
                        placeholder="Estimated Months"
                        disabled
                        value={ageMonth}
                      />
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
              <Radio.Group
                buttonStyle="solid"
                name="contactSex"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="MALE">Male</Radio.Button>
                <Radio.Button value="FEMALE">Female</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.contactSex === "FEMALE" &&
            ageYear >=
              10 && (
                <Col lg={8} md={12} sm={12} xs={24}>
                  <ClearableFormItem
                    form={form}
                    label="Pregnancy status"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="contactPregnancyStatus"
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="pregnant">Pregnant</Radio.Button>
                      <Radio.Button value="not pregnant">
                        Not Pregnant
                      </Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

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
              <DynamicSelect
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder={<>&nbsp; Select State</>}
                onChange={(value) =>
                  handleStateChange(value, "contactStateOfResidence")
                }
                options={allStates}
                valueProperty="id"
                labelProperty="name"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Contact LGA of residence"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="contactLgaOfResidence"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <DynamicSelect
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder={<>&nbsp; Select LGA</>}
                onChange={(value) =>
                  handleLgaChange(value, "contactLgaOfResidence")
                }
                options={lgaOfResidenceQuery?.data}
                valueProperty="id"
                labelProperty="name"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label={`Contact ward of residence ${
                wardOfResidenceQuery?.isLoading ? "Loading..." : ""
              }`}
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
              <DynamicSelect
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder={<>&nbsp; Select Ward</>}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={
                  wardOfResidenceQuery?.isLoading
                    ? []
                    : wardOfResidenceQuery?.data?.[
                        selectedLga?.contactLgaOfResidence
                      ]
                }
                valueProperty="id"
                labelProperty="name"
              />
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
                <Radio.Button value="no_risk">No risk</Radio.Button>
                <Radio.Button value="low_risk">Low risk</Radio.Button>
                <Radio.Button value="high_risk">High risk</Radio.Button>
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
