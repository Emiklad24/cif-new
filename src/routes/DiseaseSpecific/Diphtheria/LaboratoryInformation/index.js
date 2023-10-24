import { Col, Input, Collapse, Row, Select, Radio, Divider } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const nameOfTestingLaboratory = [
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
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

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
                      { label: "Blood", value: "blood" },
                      { label: "Skin biopsy", value: "skinBiopsy" },
                      { label: "Swab", value: "swab" },
                    ]}
                    name="specimenType"
                    onChange={(value) =>
                      handleUpdateInputValues("specimenType", value)
                    }
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.specimenType?.length >= 1 && (
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
                  label="Name Of testing laboratory"
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
                    {nameOfTestingLaboratory.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>
              <Divider plain>Laboratory result</Divider>
              {formValues?.specimenType?.includes("blood") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Blood specimen received"
                    name="bloodSampleReceived"
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
                      name="bloodSampleReceived"
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
              {formValues?.bloodSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedBlood"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedBlood"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdBlood"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Lab ID"
                        id="labid"
                        name="labid"
                        onChange={(e) => {}}
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition"
                      name="specimenConditionBlood"
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

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        form={form}
                        setFormValues={setFormValues}
                        label="Test conducted"
                        name="testConductedBlood"
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
                            { label: "PCR", value: "pcr" },
                            { label: "Serology", value: "serology" },
                          ]}
                          name="bloodTestConducted"
                          onChange={(value) =>
                            handleUpdateInputValues("bloodTestConducted", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.bloodTestConducted?.includes("pcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="PCR result"
                          name="resultBloodPcr"
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
                            <Radio.Button value="positive">
                              Positive
                            </Radio.Button>
                            <Radio.Button value="negative">
                              Negative
                            </Radio.Button>
                            <Radio.Button value="indeterminate">
                              Indeterminate
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
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBloodPcr"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                   
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("serology") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Serology result"
                          name="resultBloodSerology"
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
                            <Radio.Button value="positive">
                              Positive
                            </Radio.Button>
                            <Radio.Button value="negative">
                              Negative
                            </Radio.Button>
                            <Radio.Button value="indeterminate">
                              Indeterminate
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
                          name="dateResultReleasedBloodSerology"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodSerology"
                          />
                        </ClearableFormItem>
                      </Col>

                    
                    </Row>
                  )}
                </>
              )}
              <Divider plain></Divider>
              {formValues?.specimenType?.includes("skinBiopsy") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Skin biopsy specimen received"
                    name="skinBiopsySampleReceived"
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
                      name="skinBiopsySampleReceived"
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
              {formValues?.skinBiopsySampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedSkinBiopsy"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedSkinBiopsy"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdSkinBiopsy"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Lab ID"
                        id="labid"
                        name="labid"
                        onChange={(e) => {}}
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition"
                      name="specimenConditionSkinBiopsy"
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

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        form={form}
                        setFormValues={setFormValues}
                        label="Test conducted"
                        name="testConductedSkinBiopsy"
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
                            { label: "PCR", value: "pcr" },
                            { label: "Serology", value: "serology" },
                          ]}
                          name="bloodTestConducted"
                          onChange={(value) =>
                            handleUpdateInputValues("bloodTestConducted", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.bloodTestConducted?.includes("pcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="PCR result"
                          name="resultSkinBiopsyPcr"
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
                            <Radio.Button value="positive">
                              Positive
                            </Radio.Button>
                            <Radio.Button value="negative">
                              Negative
                            </Radio.Button>
                            <Radio.Button value="indeterminate">
                              Indeterminate
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
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSkinBiopsyPcr"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSkinBiopsyPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                    
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("serology") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Serology result"
                          name="resultSkinBiopsySerology"
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
                            <Radio.Button value="positive">
                              Positive
                            </Radio.Button>
                            <Radio.Button value="negative">
                              Negative
                            </Radio.Button>
                            <Radio.Button value="indeterminate">
                              Indeterminate
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
                          name="dateResultReleasedSkinBiopsySerology"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSkinBiopsySerology"
                          />
                        </ClearableFormItem>
                      </Col>

                      
                    </Row>
                  )}
                </>
              )}
              <Divider plain></Divider>
              {formValues?.specimenType?.includes("swab") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Swab specimen received"
                    name="swabSampleReceived"
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
                      name="swabSampleReceived"
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
              {formValues?.swabSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdSwab"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter Lab ID"
                        id="labid"
                        name="labid"
                        onChange={(e) => {}}
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Specimen condition"
                      name="specimenConditionSwab"
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

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        form={form}
                        setFormValues={setFormValues}
                        label="Test conducted"
                        name="testConductedSwab"
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
                            { label: "PCR", value: "pcr" },
                            { label: "Serology", value: "serology" },
                          ]}
                          name="swabTestConducted"
                          onChange={(value) =>
                            handleUpdateInputValues("swabTestConducted", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.swabTestConducted?.includes("pcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="PCR result"
                          name="resultSwabPcr"
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
                            <Radio.Button value="positive">
                              Positive
                            </Radio.Button>
                            <Radio.Button value="negative">
                              Negative
                            </Radio.Button>
                            <Radio.Button value="indeterminate">
                              Indeterminate
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
                          name="dateResultReleasedSwabPcr"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSwabPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                      
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("serology") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Serology result"
                          name="resultSwabSerology"
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
                            <Radio.Button value="positive">
                              Positive
                            </Radio.Button>
                            <Radio.Button value="negative">
                              Negative
                            </Radio.Button>
                            <Radio.Button value="indeterminate">
                              Indeterminate
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
                          name="dateResultReleasedSwabSerology"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSwabSerology"
                          />
                        </ClearableFormItem>
                      </Col>

                   
                    </Row>
                  )}
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
