import {
  Col,
  Form,
  Input,
  Collapse, DatePicker,
  Row, Tooltip,
  Select, Radio, Divider,
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from 'antd';
import { isArray } from 'lodash';

const nameOfTestingLaboratory = ["National Refrence Laboratory (NRL)", "Central Public Health Laboratory (CPHL)"];
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {

    console.log(inputName, value)

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value

    }))

  }

  console.log('form values', formValues)

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Laboratory information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Sample Collected"
                name="sampleCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an Option ",
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle="solid"
                  name="sampleCollected"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.sampleCollected === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date Specimen collected "
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={birth_date ? moment(birth_date) : null}
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
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Type of Specimen collected?"
                    name="sampleType"
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
                            { label: 'Blood', value: 'blood' },
                            { label: 'Crust', value: 'crust' },
                            { label: 'Swab', value: 'swab' },

                          ]}
                      name="sampleType"
                      onChange={(value) =>
                        handleUpdateInputValues("sampleType", value)
                      }
                    />
                  </Form.Item>
                </Col>

                {formValues?.sampleType?.length >= 1 && (
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Date Specimen Sent"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      // initialValue={birth_date ? moment(birth_date) : null}
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
                    </Form.Item>
                  </Col>
                )}

                <Col lg={24} md={12} sm={12} xs={24}>
                  <Form.Item
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
                    <Select
                      showSearch
                      allowClear
                      optionLabelProp="label"
                    >
                      {nameOfTestingLaboratory.map((item) => (
                        <Option label={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Divider plain>Laboratory result</Divider>
                {formValues?.sampleType?.includes('blood') && (
                <Col lg={24} md={24} sm={24}>
                  <Form.Item
                    label="Blood sample received"
                    name="bloodSampleReceived"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select an Option ",
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
                  </Form.Item>
                </Col>
                  )}
                {formValues?.bloodSampleReceived === 'yes' && (
                <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date Specimen Received "
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={birth_date ? moment(birth_date) : null}
                    name={['blood', 'dateSpecimenReceived']}
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
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Laboratory ID"
                    name={['blood', 'laboratoryId']}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Lab ID"
                      id="labid"
                      name="labid"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Specimen Condition"
                    name={['blood', 'sampleCondition']}
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
                  </Form.Item>
                </Col>

                {formValues?.sampleType?.length >= 1 && (
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Test Conducted"
                      name={['blood', 'testConducted']}
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
                        options={
                              [
                                { label: "PCR", value: "pcr" },
                                { label: "Serology", value: "serology" },
                              ]

                        }
                        name="bloodTestConducted"
                        onChange={(value) =>
                          handleUpdateInputValues("bloodTestConducted", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                {formValues?.bloodTestConducted?.includes("pcr") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PCR Result"
                        name={['blood', 'pcr', 'result']}
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="not done">Not Done</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['blood','pcr','dateResultAvailable']}
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
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Sent Out "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['blood','pcr', 'dateResultSent']}
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
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                {formValues?.bloodTestConducted?.includes("serology") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Serology Result"
                        name={['blood', 'serology', 'result']}
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="not done">Not Done</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['blood','serology', 'dateResultAvailable']}
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
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Sent Out "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['blood','serology', 'dateResultSent']}
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
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                  </>
                  )}
                <Divider plain></Divider>
                {formValues?.sampleType?.includes('crust') && (
                <Col lg={24} md={24} sm={24}>
                  <Form.Item
                    label="Crust sample received"
                    name="crustSampleReceived"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select an Option ",
                      },
                    ]}
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      name="crustSampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    >
                      <Radio.Button value="yes">Yes</Radio.Button>
                      <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                  )}
                {formValues?.crustSampleReceived === 'yes' && (
                <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date Specimen Received "
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={birth_date ? moment(birth_date) : null}
                    name={['crust', 'dateSpecimenReceived']}
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
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Laboratory ID"
                    name={['crust', 'laboratoryId']}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Lab ID"
                      id="labid"
                      name="labid"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Specimen Condition"
                    name={['crust', 'sampleCondition']}
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
                  </Form.Item>
                </Col>

                {formValues?.sampleType?.length >= 1 && (
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Test Conducted"
                      name={['crust', 'testConducted']}
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
                        options={
                              [
                                { label: "PCR", value: "pcr" },
                                { label: "Serology", value: "serology" },
                              ]

                        }
                        name="bloodTestConducted"
                        onChange={(value) =>
                          handleUpdateInputValues("bloodTestConducted", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                {formValues?.bloodTestConducted?.includes("pcr") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PCR Result"
                        name={['crust', 'pcr', 'result']}
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="not done">Not Done</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['crust','pcr','dateResultAvailable']}
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
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Sent Out "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['crust','pcr', 'dateResultSent']}
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
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                {formValues?.bloodTestConducted?.includes("serology") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Serology Result"
                        name={['crust', 'serology', 'result']}
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="not done">Not Done</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['crust','serology', 'dateResultAvailable']}
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
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Sent Out "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['crust','serology', 'dateResultSent']}
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
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                  </>
                  )}
                <Divider plain></Divider>
                {formValues?.sampleType?.includes('swab') && (
                <Col lg={24} md={24} sm={24}>
                  <Form.Item
                    label="Swab sample received"
                    name="swabSampleReceived"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select an Option ",
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
                  </Form.Item>
                </Col>
                  )}
                {formValues?.swabSampleReceived === 'yes' && (
                <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date Specimen Received "
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={birth_date ? moment(birth_date) : null}
                    name={['swab', 'dateSpecimenReceived']}
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
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Laboratory ID"
                    name={['swab', 'laboratoryId']}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Lab ID"
                      id="labid"
                      name="labid"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Specimen Condition"
                    name={['swab', 'sampleCondition']}
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
                  </Form.Item>
                </Col>

                {formValues?.sampleType?.length >= 1 && (
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Test Conducted"
                      name={['swab', 'testConducted']}
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
                        options={
                              [
                                { label: "PCR", value: "pcr" },
                                { label: "Serology", value: "serology" },
                              ]

                        }
                        name="swabTestConducted"
                        onChange={(value) =>
                          handleUpdateInputValues("swabTestConducted", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                {formValues?.swabTestConducted?.includes("pcr") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PCR Result"
                        name={['swab', 'pcr', 'result']}
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="not done">Not Done</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['swab','pcr','dateResultAvailable']}
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
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Sent Out "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['swab','pcr', 'dateResultSent']}
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
                      </Form.Item>
                    </Col>
                  </Row>
                )}

                {formValues?.bloodTestConducted?.includes("serology") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Serology Result"
                        name={['swab', 'serology', 'result']}
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="not done">Not Done</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['swab','serology', 'dateResultAvailable']}
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
                      </Form.Item>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Sent Out "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name={['swab','serology', 'dateResultSent']}
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
                      </Form.Item>
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

    </>
  );
};
export default LaboratoryInformation;
