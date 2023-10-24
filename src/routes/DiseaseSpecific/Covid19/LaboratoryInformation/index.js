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
              name="specimenCollected"
              label="Specimen collected"
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
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date specimen collected"
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
                  <CustomDatePicker name="dateSpecimenCollected" form={form} />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
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
                      { label: "Nasal swab", value: "nasalSwab" },
                      { label: "Throat swab", value: "throatSwab" },
                      { label: "Nasopharyngea", value: "nasopharyngea" },
                      { label: "Blood", value: "blood" },
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
                  setFormValues={setFormValues}
                  form={form}
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
                    {testingLaboratoryData.map((item) => (
                      <Option label={item} value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </ClearableFormItem>
              </Col>

              <Divider plain>Laboratory result</Divider>

              {formValues?.specimenType?.includes("nasalSwab") && (
                <Col lg={8} md={8} sm={24}>
                  <ClearableFormItem
                    setFormValues={setFormValues}
                    form={form}
                    label="Nasal swab"
                    name="nSwabSpecimenReceived"
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
                      name="nSwabSpecimenReceived"
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

              {formValues?.specimenType?.includes("throatSwab") && (
                <Col lg={8} md={8} sm={24}>
                  <ClearableFormItem
                    setFormValues={setFormValues}
                    form={form}
                    label="Throat swab"
                    name="tSwabSpecimenReceived"
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
                      name="tSwabSpecimenReceived"
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

              {formValues?.specimenType?.includes("nasopharyngea") && (
                <Col lg={8} md={8} sm={24}>
                  <ClearableFormItem
                    setFormValues={setFormValues}
                    form={form}
                    label="Nasopharyngea swab"
                    name="npSwabSpecimenReceived"
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
                      name="npSwabSpecimenReceived"
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

              {(formValues?.nSwabSpecimenReceived === "yes" ||
                formValues?.tSwabSpecimenReceived === "yes" ||
                formValues?.npSwabSpecimenReceived === "yes") && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSecimenReceivedNasalThroatNp"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSecimenReceivedNasalThroatNp"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Laboratory ID"
                      name="laboratoryIdNasalThroatNp"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Lab ID" />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Specimen condition"
                      name="specimenConditionNasalThroatNp"
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
                        setFormValues={setFormValues}
                        form={form}
                        label="Test conducted"
                        name="testConductedNasal"
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
                          options={
                            formValues?.specimenType?.length === 1 &&
                            formValues?.specimenType[0] === "nSwab"
                              ? [
                                  { label: "PCR", value: "pcr" },
                                  { label: "serology", value: "serology" },
                                ]
                              : [
                                  { label: "PCR", value: "pcr" },
                                  { label: "RDT", value: "rdt" },
                                ]
                          }
                          name="testConductedNasal"
                          onChange={(value) =>
                            handleUpdateInputValues("testConductedNasal", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedNasal?.includes("pcr") && (
                    <Row>
                      <Divider />
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="PCR result"
                          name="pcrResultNasalThroatNp"
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
                            name="pcrResultNasalThroatNp"
                            onChange={(e) => {
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              );
                            }}
                          >
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

                      {formValues?.pcrResultNasalThroatNp === "positive" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            setFormValues={setFormValues}
                            form={form}
                            label="Genomic sequencing PCR"
                            name="genoSequencingPcr"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                          >
                            <Radio.Group buttonStyle="solid">
                              <Radio.Button
                                value="B.1.1.7"
                                name="genoSequencing"
                              >
                                B.1.1.7
                              </Radio.Button>
                              <Radio.Button
                                value="B.1.351"
                                name="genoSequencing"
                              >
                                B.1.351
                              </Radio.Button>
                              <Radio.Button value="P.1" name="genoSequencing">
                                P.1
                              </Radio.Button>
                              <Radio.Button
                                value="B.1.617.2"
                                name="genoSequencing"
                              >
                                B.1.617.2
                              </Radio.Button>
                            </Radio.Group>
                          </ClearableFormItem>
                        </Col>
                      )}

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date PCR result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedPcr"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedPcr"
                          />
                        </ClearableFormItem>
                      </Col>

                      {/* <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentPCR"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentPCR"
                          />
                        </ClearableFormItem>
                      </Col> */}
                      <Divider />
                    </Row>
                  )}

                  {formValues?.testConductedNasal?.includes("rdt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="RDT result"
                          name="rdtResultNasalThroatNp"
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
                            name="rdtResultNasalThroatNp"
                            onChange={(e) => {
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              );
                            }}
                          >
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

                      {formValues?.rdtResultNasalThroatNp === "positive" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            label="Genomic sequencing RDT"
                            name="genoSequencingRdt"
                            form={form}
                            setFormValues={setFormValues}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                          >
                            <Radio.Group
                              buttonStyle="solid"
                              name="genoSequencingRdt"
                            >
                              <Radio.Button
                                value="B.1.1.7"
                                name="genoSequencingRdt"
                              >
                                B.1.1.7
                              </Radio.Button>
                              <Radio.Button
                                value="B.1.351"
                                name="genoSequencingRdt"
                              >
                                B.1.351
                              </Radio.Button>
                              <Radio.Button
                                value="P.1"
                                name="genoSequencingRdt"
                              >
                                P.1
                              </Radio.Button>
                              <Radio.Button
                                value="B.1.617.2"
                                name="genoSequencing"
                              >
                                B.1.617.2
                              </Radio.Button>
                            </Radio.Group>
                          </ClearableFormItem>
                        </Col>
                      )}

                      <Col lg={24} md={24} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date RDT result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedRdt"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedRdt"
                          />
                        </ClearableFormItem>
                      </Col>

                      {/* <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result sent out "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultSentOutNasal"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutNasal"
                          />
                        </ClearableFormItem>
                      </Col> */}
                    </Row>
                  )}

                  {/* {formValues?.serologyResultBlood && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBlood"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBlood"
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
                          name="dateResultSentOutBlood"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultSentOutBlood"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )} */}
                </>
              )}

              {/* {formValues?.serologyResultBlood && (
                <Row>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Date result available "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateResultReleasedBlood"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateResultReleasedBlood"
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
                      name="dateResultSentOutBlood"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateResultSentOutBlood"
                      />
                    </ClearableFormItem>
                  </Col>
                </Row>
              )} */}

              {formValues?.specimenType?.includes("blood") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    setFormValues={setFormValues}
                    form={form}
                    label="Blood specimen received"
                    name="bloodSpecimenReceived"
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
                      name="bloodSpecimenReceived"
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

              {formValues?.bloodSpecimenReceived === "yes" && (
                <>
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
                        setFormValues={setFormValues}
                        form={form}
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
                          options={
                            formValues?.specimenType?.length === 1 &&
                            formValues?.specimenType[0] ===
                              "Cerebrospinal fluid"
                              ? [
                                  { label: "PCR", value: "pcr" },
                                  { label: "serology", value: "serology" },
                                ]
                              : [{ label: "serology", value: "serology" }]
                          }
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

                  {formValues?.testConductedBlood?.includes("serology") && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Serology result"
                        name="serologyResultBlood"
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
                          name="serologyResultBlood"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
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
