import { Col, Input, Collapse, Row, Divider, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const testingLaboratoryData = [
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

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
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
          <Col lg={12} md={12} sm={24}>
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
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date specimen collected "
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

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Type of specimen collected?"
                  name="sampleType"
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
                      { label: "Blood", value: "blood" },
                      { label: "Serum", value: "serum" },
                      {
                        label: "Nasopharyngeal swab",
                        value: "nasopharyngealSwab",
                      },
                    ]}
                    name="sampleType"
                    onChange={(value) => {
                      handleUpdateInputValues("sampleType", value);

                      form.setFieldsValue({
                        nasopharyngealSwabReceived: undefined,
                        dateSecimenReceivedNasopharyngealSwab: undefined,
                        laboratoryIdNasopharyngealSwab: undefined,
                        sampleConditionNasopharyngealSwab: undefined,
                        pcrResult: undefined,
                        dateResultReleasedpcr: undefined,
                      });

                      setFormValues((previousState) => ({
                        ...previousState,
                        nasopharyngealSwabReceived: undefined,
                        dateSecimenReceivedNasopharyngealSwab: undefined,
                        laboratoryIdNasopharyngealSwab: undefined,
                        sampleConditionNasopharyngealSwab: undefined,
                        pcrResult: undefined,
                        dateResultReleasedpcr: undefined,
                      }));
                    }}
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.sampleType?.length >= 1 && (
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Date specimen sent"
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
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Name of testing laboratory"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="nameOfTestingLaboratory"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Select showSearch allowClear optionLabelProp="label">
                    {testingLaboratoryData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>

              <Divider plain>Laboratory result</Divider>

              {formValues?.sampleType?.includes("blood") ||
              formValues?.sampleType?.includes("serum") ? (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Blood/serum sample received"
                    name="bloodSerumSampleReceived"
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
                      name="bloodSerumSampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    >
                      <Radio.Button value="yes">Yes</Radio.Button>
                      <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              ) : null}

              {formValues?.bloodSerumSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedBloodSerum"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedBloodSerum"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdBloodSerum"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Lab ID"
                        id="laboratoryIdBloodSerum"
                        name="laboratoryIdBloodSerum"
                        onChange={(e) => {}}
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition"
                      name="sampleConditionBloodSerum"
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
                        <Radio.Button value="not adequate">
                          Not Adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Measles serology result"
                      name="measlesSerologyResultBloodSerum"
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
                        name="measlesSerologyResultBloodSerum"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="igm positive">
                          IgM Positive
                        </Radio.Button>
                        <Radio.Button value="igm negative">
                          IgM Negative
                        </Radio.Button>
                        <Radio.Button value="igm indeterminate">
                          IGM Indeterminate
                        </Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                        <Radio.Button value="not done">Not Done</Radio.Button>
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
                      name="dateResultReleasedMeasles"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateResultReleasedMeasles"
                      />
                    </ClearableFormItem>
                  </Col>

                  {formValues?.measlesSerologyResultBloodSerum?.includes(
                    "igm negative"
                  ) ||
                  formValues?.measlesSerologyResultBloodSerum?.includes(
                    "igm indeterminate"
                  ) ? (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Rubella serology result"
                          name="rubellaSerologyResultBloodSerum"
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
                            <Radio.Button value="igm positive">
                              IgM Positive
                            </Radio.Button>
                            <Radio.Button value="igm negative">
                              IgM Negative
                            </Radio.Button>
                            <Radio.Button value="igm indeterminate">
                              IGM Indeterminate
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="not done">
                              Not Done
                            </Radio.Button>
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
                          name="dateResultReleasedRubella"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedRubella"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Divider />
                    </Row>
                  ) : null}
                </>
              )}

              <Divider />

              {formValues?.sampleType?.includes("nasopharyngealSwab") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Nasopharyngeal swab received"
                    name="nasopharyngealSwabReceived"
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
                      name="nasopharyngealSwabReceived"
                      onChange={(e) => {
                        handleUpdateInputValues(e.target.name, e.target.value);
                        form.setFieldsValue({
                          dateSecimenReceivedNasopharyngealSwab: undefined,
                          laboratoryIdNasopharyngealSwab: undefined,
                          sampleConditionNasopharyngealSwab: undefined,
                          pcrResult: undefined,
                          dateResultReleasedpcr: undefined,
                        });
                        setFormValues((previousState) => ({
                          ...previousState,
                          dateSecimenReceivedNasopharyngealSwab: undefined,
                          laboratoryIdNasopharyngealSwab: undefined,
                          sampleConditionNasopharyngealSwab: undefined,
                          pcrResult: undefined,
                          dateResultReleasedpcr: undefined,
                        }));
                      }}
                    >
                      <Radio.Button value="yes">Yes</Radio.Button>
                      <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.nasopharyngealSwabReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSecimenReceivedNasopharyngealSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSecimenReceivedNasopharyngealSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdNasopharyngealSwab"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Lab ID"
                        id="laboratoryIdNasopharyngealSwab"
                        name="laboratoryIdNasopharyngealSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition"
                      name="sampleConditionNasopharyngealSwab"
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
                        <Radio.Button value="not adequate">
                          Not Adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="PCR result"
                      name="pcrResult"
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
                        <Radio.Button value="indeterminate">
                          Indeterminate
                        </Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                        <Radio.Button value="not done">Not Done</Radio.Button>
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
                      name="dateResultReleasedpcr"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateResultReleasedpcr"
                      />
                    </ClearableFormItem>
                  </Col>
                </>
              )}
            </>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
