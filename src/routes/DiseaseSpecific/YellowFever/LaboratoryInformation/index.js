import { Col, Collapse, Row, Divider, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const testingLaboratoryData = [
  "NRL, Gaduwa",
  "CPHL",
  "YDMH",
  "UBTH",
  "MAITAMA DISTRICT HOSPITAL LABORATORY",
  "IP DAKAR",
  "GOMBE SPECIALIST HOSPITAL",
  "UNTH",
];

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

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
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              label="Specimen collected"
              name="specimenCollected"
              setFormValues={setFormValues}
              form={form}
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
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "yes" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Date specimen collected "
                  name="dateSpecimenCollected"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Select Date Of specimen collected",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateSpecimenCollected" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Type of specimen collected?"
                  name="specimenType"
                  setFormValues={setFormValues}
                  form={form}
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
                    onChange={(value) => {
                      handleUpdateInputValues("specimenType", value);
                    }}
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.specimenType?.length >= 1 && (
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    label="Date specimen sent"
                    name="dateSpecimenSent"
                    setFormValues={setFormValues}
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Select Date Specimen Sent",
                      },
                    ]}
                  >
                    <CustomDatePicker form={form} name="dateSpecimenSent" />
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Select laboratory!",
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
              {formValues?.specimenType?.includes("blood") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    label="Blood specimen received"
                    name="bloodspecimenReceived"
                    setFormValues={setFormValues}
                    form={form}
                    onChange={(e) => {
                      handleUpdateInputValues(e.target.name, e.target.value);
                    }}
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
                      name="bloodspecimenReceived"
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

              {formValues?.bloodspecimenReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Date blood specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateBloodSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "Date specimen received",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateBloodSpecimenReceived"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Specimen condition"
                      name="specimenConditionBlood"
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
                          Not adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
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
                              value: "iggConvalescent",
                            },
                            { label: "Microscopy", value: "microscopy" },
                            { label: "PRNT", value: "prnt" },
                            { label: "PCR/RT-PCR", value: "pcrRtPcr" },
                          ]}
                          name="testConductedBlood"
                          onChange={(value) => {
                            handleUpdateInputValues(
                              "testConductedBlood",
                              value
                            );
                          }}
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedBlood?.includes("igm") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Igm result for blood specimen"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodIgm"
                          rules={[
                            {
                              required: true,
                              message: "Select Date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodIgm"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentBloodIgm"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentBloodIgm"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("iggAcute") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(Acute) result for blood specimen"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodIggA"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodIggA"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutBloodIgga"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutBloodIgga"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes(
                    "iggConvalescent"
                  ) && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(Convalescent) result for blood specimen"
                          name="iggConvalescentResultBlood"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodIggc"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodIggc"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutBloodIggc"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutBloodIggc"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("microscopy") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Microscopy result for blood"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodMicroscopy"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodMicroscopy"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutBloodMicroscopy"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutBloodMicroscopy"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("pcrRtPcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="PCR/RT-PCR result for blood"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodPcr"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
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
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutBloodPcr"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutBloodPcr"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("prnt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="PRNT result for blood specimen"
                          name="prntResultBlood"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PRNT result",
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableBloodPrnt"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableBloodPrnt"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutBloodPrnt"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutBloodPrnt"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}
                </>
              )}

              {formValues?.specimenType?.includes("sera") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    setFormValues={setFormValues}
                    form={form}
                    label="Sera specimen received"
                    name="seraspecimenReceived"
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
                      name="seraspecimenReceived"
                      onChange={(e) => {
                        handleUpdateInputValues(e.target.name, e.target.value);
                      }}
                    >
                      <Radio.Button value="yes">Yes</Radio.Button>
                      <Radio.Button value="no">No</Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.seraspecimenReceived === "yes" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSeraSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "Date specimen received",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSeraSpecimenReceived"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Specimen condition"
                      name="specimenConditionSera"
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
                        setFormValues={setFormValues}
                        form={form}
                        label="Test conducted"
                        name="testConductedSera"
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
                              value: "iggConvalescent",
                            },
                            { label: "Microscopy", value: "microscopy" },
                            { label: "PRNT", value: "prnt" },
                            { label: "PCR/RT-PCR", value: "pcrRtPcr" },
                          ]}
                          name="testConductedSera"
                          onChange={(value) => {
                            handleUpdateInputValues("testConductedSera", value);
                          }}
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedSera?.includes("igm") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Igm result for sera specimen"
                          name="igmResultSera"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableSeraIgm"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableSeraIgm"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentSeraIgm"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentSeraIgm"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("iggAcute") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(Acute) result for sera specimen"
                          name="iggAcuteResultSera"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableSeraIgga"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableSeraIgga"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutSeraIgga"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutSeraIgga"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes(
                    "iggConvalescent"
                  ) && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(convalescent) result for sera specimen"
                          name="iggConvalescentResultSera"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableSeraIggc"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableSeraIggc"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutSeraIggc"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutSeraIggc"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("microscopy") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Microscopy result for sera"
                          name="microscopyResultSera"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableSeraMicroscopy"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableSeraMicroscopy"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutSeraMicroscopy"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutSeraMicroscopy"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("pcrRtPcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="PCR/RT-PCR result for sera"
                          name="pcrRtPcrResultSera"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableSeraPcr"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableSeraPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutSeraPcr"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutSeraPcr"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("prnt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="PRNT result for sera specimen"
                          name="prntResultSera"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Select PRNT result",
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result available "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultAvailableSeraPrnt"
                          rules={[
                            {
                              required: true,
                              message: "Select date result available",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultAvailableSeraPrnt"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutSeraPrnt"
                          rules={[
                            {
                              required: true,
                              message: "Select date result sent out",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutSeraPrnt"
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
