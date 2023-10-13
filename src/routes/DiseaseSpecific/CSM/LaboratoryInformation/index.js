import { Col, Input, Collapse, Row, Select, Radio, Divider } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const testingLaboratoryData = [
  "National Reference Laboratory",
  "Central Public health laboratory ",
  "Maitama district hospital laboratory",
];

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

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
              setFormValues={setFormValues}
              form={form}
              label="Sample collected"
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
            </ClearableFormItem>
          </Col>

          {formValues?.sampleCollected === "yes" && (
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
                      message: "Select date Of specimen collected",
                    },
                  ]}
                >
                  <CustomDatePicker name="dateSpecimenCollected" form={form} />
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
                      message: "Select an Option",
                    },
                  ]}
                >
                  <CheckboxGroup
                    options={[
                      {
                        label: "Cerebrospinal fluid",
                        value: "cerebrospinalFluid",
                      },
                      { label: "Blood", value: "blood" },
                    ]}
                    name="sampleType"
                    onChange={(value) =>
                      handleUpdateInputValues("sampleType", value)
                    }
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.sampleType?.length >= 1 && (
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Date specimen Sent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="dateSpecimenSent"
                    form={form}
                    setFormValues={setFormValues}
                    rules={[
                      {
                        required: true,
                        message: "Select Date Specimen Sent",
                      },
                    ]}
                  >
                    <CustomDatePicker name="dateSpecimenSent" form={form} />
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  label="Name of testing laboratory"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  form={form}
                  setFormValues={setFormValues}
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
                </ClearableFormItem>
              </Col>
              <Divider plain>Laboratory result</Divider>
              {formValues?.sampleType?.includes("blood") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    label="Blood sample received"
                    form={form}
                    setFormValues={setFormValues}
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
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.bloodSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      label="Date specimen received"
                      form={form}
                      setFormValues={setFormValues}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedBlood"
                      rules={[
                        {
                          required: true,
                          message: "Date Specimen received",
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
                      label="Laboratory ID"
                      form={form}
                      setFormValues={setFormValues}
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
                      label="Specimen condition"
                      form={form}
                      setFormValues={setFormValues}
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
                    </ClearableFormItem>
                  </Col>

                  {formValues?.sampleType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        label="Test conducted"
                        name="testConductedBlood"
                        form={form}
                        setFormValues={setFormValues}
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
                            { label: "RDT", value: "rdt" },
                            { label: "Culture", value: "culture" },
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
                          label="PCR result"
                          name="resultBloodPcr"
                          form={form}
                          setFormValues={setFormValues}
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
                          label="Date result available "
                          form={form}
                          setFormValues={setFormValues}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodPcr"
                          rules={[
                            {
                              required: true,
                              message: "SelectDateResultAvailable",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          form={form}
                          setFormValues={setFormValues}
                          name="dateResultSentBloodPcr"
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentBloodPcr"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("rdt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="RDT result"
                          name="resultBloodRdt"
                          form={form}
                          setFormValues={setFormValues}
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
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodRdt"
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodRdt"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          form={form}
                          setFormValues={setFormValues}
                          name="dateResultSentBloodRdt"
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentBloodRdt"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("culture") && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        label="Culture result"
                        name="resultBloodCulture"
                        form={form}
                        setFormValues={setFormValues}
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
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="growth">Growth</Radio.Button>
                          <Radio.Button value="no growth">
                            No Growth
                          </Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                  )}
                  {formValues?.cultureResult && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          form={form}
                          setFormValues={setFormValues}
                          name="dateResultAvailableBloodCulture"
                          rules={[
                            {
                              required: true,
                              message: "Select Result Available Date",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodCulture"
                          />
                        </ClearableFormItem>
                      </Col>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          form={form}
                          setFormValues={setFormValues}
                          name="dateResultSentBloodCulture"
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentBloodCulture"
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
                  )}
                </>
              )}
              <Divider plain></Divider>
              {formValues?.sampleType?.includes("cerebrospinalFluid") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    label="Cerebrospinal fluid sample received"
                    name="csfSampleReceived"
                    form={form}
                    setFormValues={setFormValues}
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
                      name="csfSampleReceived"
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
              {formValues?.csfSampleReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      form={form}
                      setFormValues={setFormValues}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedCsf"
                      rules={[
                        {
                          required: true,
                          message: "Date Specimen received",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedCsf"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      label="Laboratory ID"
                      name="laboratoryIdCsf"
                      labelCol={{ span: 24 }}
                      form={form}
                      setFormValues={setFormValues}
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
                      label="Specimen condition"
                      name="sampleConditionCsf"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      form={form}
                      setFormValues={setFormValues}
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

                  {formValues?.sampleType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        label="Test conducted"
                        name="testConductedCsf"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        form={form}
                        setFormValues={setFormValues}
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
                            { label: "Culture", value: "culture" },
                          ]}
                          name="testConducted"
                          onChange={(value) =>
                            handleUpdateInputValues("testConducted", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConducted?.includes("pcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="PCR result"
                          name="resultCsfPcr"
                          form={form}
                          setFormValues={setFormValues}
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
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableCsfPcr"
                          form={form}
                          setFormValues={setFormValues}
                          rules={[
                            {
                              required: true,
                              message: "SelectDateResultAvailable",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableCsfPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentCsfPcr"
                          form={form}
                          setFormValues={setFormValues}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentCsfPcr"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConducted?.includes("rdt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="RDT result"
                          name="rdtResultCsfRdt"
                          form={form}
                          setFormValues={setFormValues}
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
                          label="Date result available "
                          form={form}
                          setFormValues={setFormValues}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableCsfRdt"
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableCsfRdt"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          form={form}
                          setFormValues={setFormValues}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentCsfRdt"
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentCsfRdt"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConducted?.includes("culture") && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        label="Culture result"
                        name="resultCsfCulture"
                        form={form}
                        setFormValues={setFormValues}
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
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="growth">Growth</Radio.Button>
                          <Radio.Button value="no growth">
                            No Growth
                          </Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                  )}
                  {formValues?.cultureResult && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableCsfCultre"
                          form={form}
                          setFormValues={setFormValues}
                          rules={[
                            {
                              required: true,
                              message: "Select Result Available Date",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableCsfCultre"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentCsfCulture"
                          form={form}
                          setFormValues={setFormValues}
                          rules={[
                            {
                              required: true,
                              message: "Select Date Result Sent Out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentCsfCulture"
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
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
