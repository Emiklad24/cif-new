import {
  Col,
  Form,
  Collapse,
  DatePicker,
  Row,
  Divider,
  Select,
  Radio,
} from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from "antd";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const testingLaboratoryData = [
  "NRL, Gaduwa",
  "CPHL",
  "YDMH",
  "UBTH",
  "MAITAMA DISTRICT HOSPITAL LABORATORY",
  "GOMBE SPECIALIST HOSPITAL",
  "UNTH",
];

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form);

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));

    if (
      formValues?.specimenCollected === "no" ||
      formValues?.specimenCollected === "unknown"
    ) {
      form.setFieldsValue({
        dateSpecimenCollected: null,
        specimenType: null,
        dateSpecimenSent: null,
        nameOfTestingLaboratory: null,
        specimenCollected: null,
        bloodSampleReceived: null,
        dateSpecimenReceivedBlood: null,
        sampleConditionBlood: null,
        testConductedBlood: null,
        seraSampleReceived: null,
        igmResultBlood: null,
        dateResultAvailableBlood: null,
        dateResultSentBlood: null,
        iggAcuteResultBlood: null,
        dateResultSentOutBlood: null,
        dateResultAvailable: null,
        dateResultSentOut: null,
        microscopyResultBlood: null,
        dateMicroscopyResultAvailableBlood: null,
        dateMicroscopyResultSentOutBlood: null,
        pcrRtPcrResultBlood: null,
        datepcrRtPcrResultResultAvailableBlood: null,
        datecrRtPcrResultSentOutBlood: null,
      });

      setFormValues((previousState) => ({
        ...previousState,
        dateSpecimenCollected: null,
        specimenType: null,
        dateSpecimenSent: null,
        nameOfTestingLaboratory: null,
        specimenCollected: null,
        bloodSampleReceived: null,
        dateSpecimenReceivedBlood: null,
        sampleConditionBlood: null,
        testConductedBlood: null,
        seraSampleReceived: null,
        igmResultBlood: null,
        dateResultAvailableBlood: null,
        dateResultSentBlood: null,
        iggAcuteResultBlood: null,
        dateResultSentOutBlood: null,
        dateResultAvailable: null,
        dateResultSentOut: null,
        microscopyResultBlood: null,
        dateMicroscopyResultAvailableBlood: null,
        dateMicroscopyResultSentOutBlood: null,
        pcrRtPcrResultBlood: null,
        datepcrRtPcrResultResultAvailableBlood: null,
        datecrRtPcrResultSentOutBlood: null,
      }));
    }
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Specimen collected"
              name="specimenCollected"
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
                name="specimenCollected"
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

          {formValues?.specimenCollected === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="Date Specimen collected "
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
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <Form.Item
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
                      {
                        label: "Blood",
                        value: "blood",
                      },
                      { label: "Sera", value: "sera" },
                    ]}
                    name="specimenType"
                    onChange={(value) =>
                      handleUpdateInputValues("specimenType", value)
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
                  <Select showSearch allowClear optionLabelProp="label">
                    {testingLaboratoryData.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Divider plain>Laboratory result</Divider>
              {formValues?.specimenType?.includes("blood") && (
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

              {formValues?.specimenType?.includes("sera") && (
                <Col lg={24} md={24} sm={24}>
                  <Form.Item
                    label="Sera sample received"
                    name="seraSampleReceived"
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
                      name="seraSampleReceived"
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

              {formValues?.bloodSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Date Specimen Received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      // initialValue={birth_date ? moment(birth_date) : null}
                      name="dateSpecimenReceivedBlood"
                      rules={[
                        {
                          required: true,
                          message: "Date Specimen received (Blood)",
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
                      label="Specimen Condition"
                      name="sampleConditionBlood"
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

                  {formValues?.specimenType.includes("sera") && (
                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="Test conducted"
                        name="testConductedBlood"
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
                            { label: "Igm", value: "igm" },
                            { label: "IgG(acute)", value: "iggAcute" },
                            {
                              label: "IgG(convalescent)",
                              value: "iggConvalescent)",
                            },
                            { label: "Microscopy", value: "microscopy" },
                            { label: "PCR/RT-PCR", value: "PcrRtPcr" },
                          ]}
                          name="testConductedBlood"
                          onChange={(value) =>
                            handleUpdateInputValues("testConductedBlood", value)
                          }
                        />
                      </Form.Item>
                    </Col>
                  )}

                  {formValues?.testConductedBlood?.includes("igm") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Igm Result"
                          name="igmResultBlood"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select Igm result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBlood"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
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
                          name="dateResultSentBlood"
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

                  {formValues?.testConductedBlood?.includes("iggAcute") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="IgG(Acute) Result"
                          name="iggAcuteResultBlood"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select igg(Acute) result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Sent Out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutBlood"
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

                  {formValues?.testConductedBlood?.includes(
                    "iggConvalescent"
                  ) && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="IgG(Acute) Result"
                          name={["blood", "iggConvalescentResult"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select igg(Convalescent) result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
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
                          name="dateResultSentOut"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
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

                  {formValues?.testConductedBlood?.includes("microscopy") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Microscopy result"
                          name="microscopyResultBlood"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select microscopy result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={birth_date ? moment(birth_date) : null}
                          name="dateMicroscopyResultAvailableBlood"
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
                          name="dateMicroscopyResultSentOutBlood"
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

                  {formValues?.testConductedBlood?.includes("pcrRtPcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="PCR/RT-PCR Result"
                          name="pcrRtPcrResultBlood"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PCR/RT-PCR result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="datepcrRtPcrResultResultAvailableBlood"
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
                          name="datecrRtPcrResultSentOutBlood"
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

              {formValues?.seraSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Date Specimen Received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      // initialValue={birth_date ? moment(birth_date) : null}
                      name={["sera", "dateSecimenReceived"]}
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
                      label="Specimen Condition"
                      name={["sera", "sampleCondition"]}
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
                        name={["sera", "testConducted"]}
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
                            formValues?.sampleType[0] === "Sera"
                              ? [
                                  { label: "Igm", value: "igm" },
                                  { label: "PCR/RT-PCR", value: "PcrRtPcr" },
                                ]
                              : [
                                  { label: "Igm", value: "igm" },
                                  { label: "IgG(acute)", value: "iggAcute" },
                                  {
                                    label: "IgG(convalescent)",
                                    value: "iggConvalescent)",
                                  },
                                  { label: "Microscopy", value: "microscopy" },
                                  { label: "PCR/RT-PCR", value: "pcrRtPcr" },
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

                  {formValues?.testConducted?.includes("igm") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Igm Result"
                          name={["sera", "igmResult"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select IGM result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={birth_date ? moment(birth_date) : null}
                          name={["sera", "dateResultAvailable"]}
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
                          name={["sera", "dateResultSent"]}
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

                  {formValues?.testConducted?.includes("iggAcute") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="IgG(Acute) Result"
                          name={["sera", "iggAcuteResult"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select igg(Acute) result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={birth_date ? moment(birth_date) : null}
                          name={["sera", "dateResultAvailable"]}
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
                          name={["sera", "dateResultSentOut"]}
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

                  {formValues?.testConducted?.includes("iggConvalescent") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="IgG(convalescent) Result"
                          name={["sera", "iggConvalescentResult"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select IgG(convalescent) result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={birth_date ? moment(birth_date) : null}
                          name={["sera", "dateResultAvailable"]}
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
                          name={["sera", "dateResultSentOut"]}
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

                  {formValues?.testConducted?.includes("microscopy") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Microscopy Result"
                          name={["sera", "microscopyResult"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select Microscopy result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={birth_date ? moment(birth_date) : null}
                          name={["sera", "dateResultAvailable"]}
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
                          name={["sera", "dateResultSentOut"]}
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

                  {formValues?.testConducted?.includes("pcrRtPcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="PCR/RT-PCR Result"
                          name={["sera", "pcrRtPcrResult"]}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PCR/RT-PCR result",
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Date Result Available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={birth_date ? moment(birth_date) : null}
                          name={["sera", "dateResultAvailable"]}
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
                          name={["sera", "dateResultSentOut"]}
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
  );
};
export default LaboratoryInformation;
