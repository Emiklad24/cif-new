import {
  Col,
  Form,
  Input,
  Collapse,
  DatePicker,
  Row,
  Tooltip, Divider,
  Select,
  Radio,
} from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const diseaseData = ["COVID-19", "Cholera", "Yellow Fever"];
const cultureresultData = ["Positive", "Negative", "Pending", "indeterminate"];
const testingLaboratoryData = [
  "National Reference Laboratory",
  "Central Public health laboratory ",
  "Maitama district hospital laboratory",
];

const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const LaboratoryInformation = ({ form }) => {
  const [lga, setLga] = useState([]);
  const [testinglaboratory_type, settestingLaboratory] = useState("");
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

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));


    if (formValues?.sampleCollected === "no" || formValues?.sampleCollected === "unknown") {
      console.log('hhhh')
      form.setFieldsValue({
        dateSpecimenCollected: null, specimenCollected: null, dateSpecimenSent: null, nameOfTestingLaboratory: null
      });
    }
  };

  console.log("form values", formValues);

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
                    name="specimenCollected"
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
                        {
                          label: "Swab",
                          value: "swab",
                        },
                        { label: "Fine Needle Aspirates", value: "Fna" }, { label: "Biopsy", value: "Biopsy" }
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

                <Col lg={24} md={6} sm={12} xs={24}>
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
                      onChange={settestingLaboratory}
                    >
                      {testingLaboratoryData.map((item) => (
                        <Option label={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Divider plain>Laboratory Result</Divider>
                {formValues?.sampleType?.length >= 1 && (
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Specimen Received?"
                      name="specimenReceived"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Select Specimen Received",
                        },
                      ]}
                    >
                      <CheckboxGroup
                        options={
                          formValues?.sampleType?.length >= 1
                            ? [
                              {
                                label: "Swab",
                                value: "Swab",
                              },
                              { label: "Fine Needle Aspirates", value: "Fine Needle Aspirates" },{label: "Biopsy",value: "Biopsy"}
                            ]
                            : formValues?.sampleType?.length === 1 &&
                              formValues?.sampleType?.includes(
                                "Cerebrospinal fluid"
                              )
                              ? [
                                {
                                  label: "Cerebrospinal fluid",
                                  value: "Cerebrospinal fluid",
                                },
                              ]
                              : formValues?.sampleType?.length === 1 &&
                                formValues?.sampleType?.includes("Blood")
                                ? [{ label: "Blood", value: "Blood" }]
                                : null
                        }
                        name="specimenReceived"
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date Specimen Received "
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={birth_date ? moment(birth_date) : null}
                    name="dateSecimenReceived"
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
                    name="laboratoryId"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Lab ID"
                      id="labid"
                      name="labid"
                      onChange={(e) => { }}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Specimen Condition"
                    name="sampleCondition"
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
                      name="testConducted"
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
                          formValues?.sampleType?.length === 1 &&
                            formValues?.sampleType[0] === "Cerebrospinal fluid"
                            ? [
                              { label: "PCR", value: "pcr" },
                              { label: "Culture", value: "culture" },
                            ]
                            : [
                              { label: "PCR", value: "pcr" },
                              { label: "Histopathology", value: "histopathology" },
                              { label: "Culture", value: "culture" },
                            ]
                        }
                        name="testConducted"
                        onChange={(value) =>
                          handleUpdateInputValues("testConducted", value)
                        }
                      />
                    </Form.Item>
                  </Col>
                )}

                {formValues?.testConducted?.includes("pcr") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PCR Result"
                        name="pcrRresult"
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
                        name="dateResultAvailable"
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
                        name="dateResultSent"
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

                {formValues?.testConducted?.includes("histopathology") && (
                  <Row>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Histopathology"
                        name="histopathologyresult"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "Select Histopathology result",
                          },
                        ]}
                      >
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
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
                        name="dateResultAvailable"
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
                        name="dateResultSentOut"
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

                {formValues?.testConducted?.includes("culture") && (
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Culture Result"
                      name="cultureResult"
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
                        name="cultureResult"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="growth">Growth</Radio.Button>
                        <Radio.Button value="no growth">No Growth</Radio.Button>
                        <Radio.Button value="not done">Not Done</Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                )}
                {formValues?.cultureResult && (
                  <>
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Result Available "
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name="dateResultAvailable"
                        rules={[
                          {
                            required: true,
                            message: "Select Result Available Date",
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
                        name="dateResultSentOut"
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

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Date Test Conducted"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        // initialValue={birth_date ? moment(birth_date) : null}
                        name="dateTestConducted"
                        rules={[
                          {
                            required: true,
                            message: "Select Date Test Conducted",
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

