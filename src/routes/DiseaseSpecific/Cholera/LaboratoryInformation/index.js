import { Col, Collapse, Row, Divider, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;
  
  const laboratoryData = [
    "ACEGID -African Centre of Excellence for Genomics of Infectious Diseases, Ogun",
    "AE-FUTHA -Alex Ekwueme Federal University Teaching Hospital Virology Laboratory",
    "BUK -Bayero University Kano Centre for Infectious Disease and Research, Kano",
    "FMC JALINGO -Federal Medical Centre, Jalingo, Taraba",
    "FMC OWO -Federal Medical Centre Owo, Ondo",
    "ISTH -Irrua Specialist Teaching Hospital, Edo",
    "LUTH -Lagos University Teaching Hospital Virology Laboratory, Lagos",
    "MOGID -Molecular Genetics and Infectious Diseases Research Laboratory, Bauchi",
    "NRL -National Reference Laboratory Gaduwa, FCT",
  ];

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const customDividerStyle = {
    "&.ant-divider-inner-text": {
      border: "4px solid #000", 
    },
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Specimen collected"
              name="specimenCollected"
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
                name="specimenCollected"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "yes" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date specimen was collected"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateSpecimenCollected"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateSpecimenCollected" />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Type of specimen collected"
                  name="specimenType"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CheckboxGroup
                    options={[
                      { label: "Stool", value: "stool" },
                      { label: "Rectal swab", value: "rectal swab" },
                    ]}
                    name="specimenType"
                    onChange={(value) => {
                      handleUpdateInputValues("specimenType", value);
                    }}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Select showSearch allowClear optionLabelProp="label">
                    {laboratoryData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date specimen was sent"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateSpecimenSent"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateSpecimenSent" />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="RDT result"
                  name="rdtResult"
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
                    <Radio.Button value="positive">Positive</Radio.Button>
                    <Radio.Button value="negative">Negative</Radio.Button>
                    <Radio.Button value="not done">Not done</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Divider className={customDividerStyle}>
                Laboratory Result
              </Divider>

              {formValues?.specimenType?.includes("stool") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Stool specimen received"
                    name="stoolSwabSpecimenReceived"
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
                      name="stoolSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    >
                      <Radio.Button value="yes">Yes</Radio.Button>
                      <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.stoolSwabSpecimenReceived === "yes" && (
                <Row>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Stool date specimen Received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedStool"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedStool"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition?"
                      name="specimenConditionStool"
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
                        <Radio.Button value="adequate">Adequate</Radio.Button>
                        <Radio.Button value="notadequate">
                          Not adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Type of test done"
                      name="typeOfTestDoneStool"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CheckboxGroup
                        options={[
                          { label: "Microscopy", value: "microscopy" },
                          { label: "Culture", value: "culture" },
                        ]}
                        name="typeOfTestDoneStool"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date of specimen tested"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenTestedStool"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenTestedStool"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Test result"
                      name="testResultStool"
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
                        <Radio.Button value="positive">Positive</Radio.Button>
                        <Radio.Button value="negative">Negative</Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date result released"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateResultReleasedStool"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateResultReleasedStool"
                      />
                    </ClearableFormItem>
                  </Col>
                  <Divider />
                </Row>
              )}

              {formValues?.specimenType?.includes("rectal swab") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Rectal swab specimen received"
                    name="rectalSwabSpecimenReceived"
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
                      name="rectalSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    >
                      <Radio.Button value="yes">Yes</Radio.Button>
                      <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.rectalSwabSpecimenReceived === "yes" && (
                <Row>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Rectal swab date specimen received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedRectalSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedRectalSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition?"
                      name="specimenConditionRectalSwab"
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
                        <Radio.Button value="adequate">Adequate</Radio.Button>
                        <Radio.Button value="notadequate">
                          Not adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Type of test done"
                      name="typeOfTestDoneRectalSwab"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CheckboxGroup
                        options={[
                          { label: "Microscopy", value: "microscopy" },
                          { label: "Culture", value: "culture" },
                        ]}
                        name="typeOfTestDoneRectalSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date of specimen tested"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenTestedRectalSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenTestedRectalSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Test result"
                      name="testResultRectalSwab"
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
                        <Radio.Button value="positive">Positive</Radio.Button>
                        <Radio.Button value="negative">Negative</Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date result released"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateResultReleasedRectalSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        name="dateResultReleasedRectalSwab"
                        form={form}
                      />
                    </ClearableFormItem>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
