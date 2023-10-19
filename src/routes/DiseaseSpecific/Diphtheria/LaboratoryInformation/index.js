import {
  Col,
  Form,
  Input,
  Collapse,
  DatePicker,
  Row,
  Select,
  Radio,
  Divider,
} from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import moment from "moment";
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
  const [isDatePickerDisabled] = useState(false);

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
                      message: "Select Date Of specimen collected",
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
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Type of Specimen collected?"
                  name="specimenType"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Select an Option",
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
                    label="Date Specimen Sent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}

                    name="dateSpecimenSent"
                    rules={[
                      {
                        required: true,
                        message: "Select Date Specimen Sent",
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
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Name Of Testing Laboratory"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="nameOfTestingLaboratory"
                  rules={[
                    {
                      required: true,
                      message: "Select laboratory!",
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
                      label="Date Specimen Received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
  
                      name={["blood", "dateSpecimenReceived"]}
                      rules={[
                        {
                          required: true,
                          message: "Date Specimen received",
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
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name={["blood", "laboratoryId"]}
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
                      label="Specimen Condition"
                      name={["blood", "specimenCondition"]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select an Option",
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
                        label="Test Conducted"
                        name={["blood", "testConducted"]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "select an option",
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
                          label="PCR Result"
                          name={["blood", "pcr", "result"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PCR result",
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
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["blood", "pcr", "dateResultAvailable"]}
                          rules={[
                            {
                              required: true,
                              message: "SelectDateResultAvailable",
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
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["blood", "pcr", "dateResultSent"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
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
                          label="Serology Result"
                          name={["blood", "serology", "result"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select RDT result",
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
                          label="Date Result Available"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["blood", "serology", "dateResultAvailable"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Available",
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
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["blood", "serology", "dateResultSent"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
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
                    label="Skin Biopsy specimen received"
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
                      label="Date Specimen Received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
  
                      name={["skinBiopsy", "dateSpecimenReceived"]}
                      rules={[
                        {
                          required: true,
                          message: "Date Specimen received",
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
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name={["skinBiopsy", "laboratoryId"]}
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
                      label="Specimen Condition"
                      name={["skinBiopsy", "specimenCondition"]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select an Option",
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
                        label="Test Conducted"
                        name={["skinBiopsy", "testConducted"]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "select an option",
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
                          label="PCR Result"
                          name={["skinBiopsy", "pcr", "result"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PCR result",
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
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["skinBiopsy", "pcr", "dateResultAvailable"]}
                          rules={[
                            {
                              required: true,
                              message: "SelectDateResultAvailable",
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
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["skinBiopsy", "pcr", "dateResultSent"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
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
                          label="Serology Result"
                          name={["skinBiopsy", "serology", "result"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select RDT result",
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
                          label="Date Result Available"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={[
                            "skinBiopsy",
                            "serology",
                            "dateResultAvailable",
                          ]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Available",
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
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["skinBiopsy", "serology", "dateResultSent"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
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
                      label="Date Specimen Received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
  
                      name={["swab", "dateSpecimenReceived"]}
                      rules={[
                        {
                          required: true,
                          message: "Date Specimen received",
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
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name={["swab", "laboratoryId"]}
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
                      label="Specimen Condition"
                      name={["swab", "specimenCondition"]}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select an Option",
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
                        label="Test Conducted"
                        name={["swab", "testConducted"]}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "select an option",
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
                          label="PCR Result"
                          name={["swab", "pcr", "result"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PCR result",
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
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["swab", "pcr", "dateResultAvailable"]}
                          rules={[
                            {
                              required: true,
                              message: "SelectDateResultAvailable",
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
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["swab", "pcr", "dateResultSent"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
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
                          label="Serology Result"
                          name={["swab", "serology", "result"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select RDT result",
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
                          label="Date Result Available"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["swab", "serology", "dateResultAvailable"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Available",
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
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          form={form}
                          setFormValues={setFormValues}
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
      
                          name={["swab", "serology", "dateResultSent"]}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
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
