import { Col, Input, Collapse, Row, Divider, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";
import useGetHealthFacilities from "../../../../hooks/useGetHealthFacilities.hook";
import DynamicSelect from "../../../../components/Custom/DynamicSelect";

const CheckboxGroup = Checkbox.Group;

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

  const { data: allLookup } = useFetchAllLookup();
  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const nameOfTestingLaboratory = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
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
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
                name="specimenCollected"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
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
                  collectFormName={true}
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
                    }}
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.sampleType?.length >= 1 && (
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    form={form}
                    setFormValues={setFormValues}
                    label="Date specimen sent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    name="dateSpecimenSent"
                  >
                    <CustomDatePicker form={form} name="dateSpecimenSent" />
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  collectFormName={true}
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
                  <DynamicSelect
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    options={nameOfTestingLaboratory}
                    valueProperty="id"
                    labelProperty="name"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  />
                </ClearableFormItem>
              </Col>

              <Divider plain>Laboratory result</Divider>

              {formValues?.sampleType?.includes("blood") ||
              formValues?.sampleType?.includes("serum") ? (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
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
                    <DynamicRadio
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="bloodSerumSampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              ) : null}

              {formValues?.bloodSerumSampleReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
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
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdBloodSerum"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
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
                      collectFormName={true}
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
                      <Radio.Group
                        buttonStyle="solid"
                        name="sampleConditionBloodSerum"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="adequate">Adequate</Radio.Button>
                        <Radio.Button value="notAdequate">
                          Not Adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.sampleConditionBloodSerum &&
                    formValues?.sampleConditionBloodSerum === "notAdequate" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Reason why specimen is not adequate"
                          name="reasonSampleConditionBloodSerum"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Reason"
                            id="reasonSampleConditionBloodSerum"
                            name="reasonSampleConditionBloodSerum"
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
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

                  {formValues?.measlesSerologyResultBloodSerum &&
                    formValues?.measlesSerologyResultBloodSerum !==
                      "pending" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
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
                    )}

                  {formValues?.measlesSerologyResultBloodSerum?.includes(
                    "igm negative"
                  ) ||
                  formValues?.measlesSerologyResultBloodSerum?.includes(
                    "igm indeterminate"
                  ) ? (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
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
                          <Radio.Group
                            buttonStyle="solid"
                            name="rubellaSerologyResultBloodSerum"
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
                            <Radio.Button value="not done">
                              Not Done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.rubellaSerologyResultBloodSerum &&
                        formValues?.rubellaSerologyResultBloodSerum !==
                          "pending" && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
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
                        )}

                      <Divider />
                    </Row>
                  ) : null}
                </>
              )}

              <Divider />

              {formValues?.sampleType?.includes("nasopharyngealSwab") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
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
                    <DynamicRadio
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="nasopharyngealSwabReceived"
                      onChange={(e) => {
                        handleUpdateInputValues(e.target.name, e.target.value);
                      }}
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.nasopharyngealSwabReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
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
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdNasopharyngealSwab"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
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
                      collectFormName={true}
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
                      <Radio.Group
                        buttonStyle="solid"
                        name="sampleConditionNasopharyngealSwab"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="adequate">Adequate</Radio.Button>
                        <Radio.Button value="not adequate">
                          Not Adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.sampleConditionNasopharyngealSwab ===
                    "not adequate" && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Reason why specimen is not adequate"
                        name="reasonSampleConditionNasopharyngealSwab"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Reason"
                          id="reasonSampleConditionNasopharyngealSwab"
                          name="reasonSampleConditionNasopharyngealSwab"
                          onChange={(e) => {}}
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
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
                      <Radio.Group
                        buttonStyle="solid"
                        name="pcrResult"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
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

                  {formValues?.pcrResult &&
                    !["pending", "not done"].includes(
                      formValues?.pcrResult
                    ) && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
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
