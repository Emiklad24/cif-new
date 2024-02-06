import { Checkbox, Col, Collapse, Divider, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import { USER_ROLE } from "constants/ActionTypes";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import useGetHealthFacilities from "hooks/useGetHealthFacilities.hook";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "styles/pages/form.less";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;
  const [labComponentDisabled, setLabComponentDisabled] = useState(false);
  const { userRole } = useSelector(({ common }) => common);
console.log("dddddd",userRole)
  useEffect(() => {
    if (!userRole) return;
    if (userRole === USER_ROLE.LAB || userRole === USER_ROLE.SUPER) {
      setLabComponentDisabled(false);
    } else {
      setLabComponentDisabled(true);
    }
  }, [userRole]);
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const testingLaboratoryData = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );

  const { data: allLookup } = useFetchAllLookup();

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
              label="Specimen collected"
              name="specimenCollected"
              setFormValues={setFormValues}
              form={form}
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
                  label="Date specimen collected "
                  name="dateSpecimenCollected"
                  form={form}
                  setFormValues={setFormValues}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                  collectFormName={true}
                  label="Type of specimen collected?"
                  name="specimenType"
                  form={form}
                  setFormValues={setFormValues}
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
                      {
                        label: "Cerebrospinal fluid",
                        value: "cerebrospinalFluid",
                      },
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
                    collectFormName={true}
                    label="Date specimen Sent"
                    name="dateSpecimenSent"
                    form={form}
                    setFormValues={setFormValues}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker name="dateSpecimenSent" form={form} />
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  collectFormName={true}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
                  form={form}
                  setFormValues={setFormValues}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                    options={testingLaboratoryData}
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
              {formValues?.specimenType?.includes("blood") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    label="Blood specimen received"
                    name="bloodSampleReceived"
                    form={form}
                    setFormValues={setFormValues}
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
                      disabled={labComponentDisabled}
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="bloodSampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.bloodSampleReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      label="Date specimen received"
                      name="dateSpecimenReceivedBlood"
                      form={form}
                      setFormValues={setFormValues}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        disabled={labComponentDisabled}
                        form={form}
                        name="dateSpecimenReceivedBlood"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      label="Laboratory ID"
                      name="laboratoryIdBlood"
                      form={form}
                      setFormValues={setFormValues}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        disabled={labComponentDisabled}
                        placeholder="Enter Lab ID"
                        id="labid"
                        name="labid"
                        onChange={(e) => {}}
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      label="Specimen condition"
                      name="specimenConditionBlood"
                      form={form}
                      setFormValues={setFormValues}
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
                        disabled={labComponentDisabled}
                        buttonStyle="solid"
                        name="specimenConditionBlood"
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

                  {formValues?.specimenConditionBlood &&
                    formValues?.specimenConditionBlood === "not adequate" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Reason why specimen is not adequate"
                          name="reasonSampleConditionNotAdequateBlood"
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
                            disabled={labComponentDisabled}
                            placeholder="Reason"
                            id="reasonSampleConditionNotAdequateBlood"
                            name="reasonSampleConditionNotAdequateBlood"
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Test conducted"
                        name="testConductedBlood"
                        form={form}
                        setFormValues={setFormValues}
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
                          disabled={labComponentDisabled}
                          options={[
                            { label: "PCR", value: "pcr" },
                            { label: "RDT", value: "rdt" },
                            { label: "Culture", value: "culture" },
                          ]}
                          name="testConductedBlood"
                          onChange={(value) =>
                            handleUpdateInputValues("testConductedBlood", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedBlood?.includes("pcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="PCR result"
                          name="resultBloodPcr"
                          form={form}
                          setFormValues={setFormValues}
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            name="resultBloodPcr"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
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
                      {formValues?.resultBloodPcr &&
                        !["pending", "not done"].includes(
                          formValues?.resultBloodPcr
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              label="Date result released"
                              name="dateResultReleasedBloodPcr"
                              form={form}
                              setFormValues={setFormValues}
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                disabled={labComponentDisabled}
                                form={form}
                                name="dateResultReleasedBloodPcr"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("rdt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="RDT result"
                          name="resultBloodRdt"
                          form={form}
                          setFormValues={setFormValues}
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            name="resultBloodRdt"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
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

                      {formValues?.resultBloodRdt &&
                        !["pending", "not done"].includes(
                          formValues?.resultBloodRdt
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              label="Date result released "
                              name="dateResultReleasedBloodRdt"
                              form={form}
                              setFormValues={setFormValues}
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                disabled={labComponentDisabled}
                                form={form}
                                name="dateResultReleasedBloodRdt"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("culture") && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Culture result"
                        name="resultBloodCulture"
                        form={form}
                        setFormValues={setFormValues}
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
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          name="resultBloodCulture"
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
                  {formValues?.resultBloodCulture === "growth" && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Date result released "
                        name="dateResultReleasedBloodCulture"
                        form={form}
                        setFormValues={setFormValues}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          disabled={labComponentDisabled}
                          form={form}
                          name="dateResultReleasedBloodCulture"
                        />
                      </ClearableFormItem>
                    </Col>
                  )}
                </>
              )}
              <Divider plain></Divider>
              {formValues?.specimenType?.includes("cerebrospinalFluid") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    label="Cerebrospinal fluid specimen received"
                    name="csfSampleReceived"
                    form={form}
                    setFormValues={setFormValues}
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
                      disabled={labComponentDisabled}
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="csfSampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}
              {formValues?.csfSampleReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      label="Date specimen received "
                      name="dateSpecimenReceivedCsf"
                      form={form}
                      setFormValues={setFormValues}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        disabled={labComponentDisabled}
                        form={form}
                        name="dateSpecimenReceivedCsf"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      label="Laboratory ID"
                      name="laboratoryIdCsf"
                      form={form}
                      setFormValues={setFormValues}
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        disabled={labComponentDisabled}
                        placeholder="Enter Lab ID"
                        id="labid"
                        name="labid"
                        onChange={(e) => {}}
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      label="Specimen condition"
                      name="specimenConditionCsf"
                      form={form}
                      setFormValues={setFormValues}
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
                        disabled={labComponentDisabled}
                        buttonStyle="solid"
                        name="specimenConditionCsf"
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

                  {formValues?.specimenConditionCsf &&
                    formValues?.specimenConditionCsf === "not adequate" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Reason why specimen is not adequate"
                          name="reasonSampleConditionNotAdequateCsf"
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
                            disabled={labComponentDisabled}
                            placeholder="Reason"
                            id="reasonSampleConditionNotAdequateCsf"
                            name="reasonSampleConditionNotAdequateCsf"
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Test conducted"
                        name="testConductedCsf"
                        form={form}
                        setFormValues={setFormValues}
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
                          disabled={labComponentDisabled}
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
                          collectFormName={true}
                          label="PCR result"
                          name="resultCsfPcr"
                          form={form}
                          setFormValues={setFormValues}
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
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

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Date result released "
                          name="dateResultReleasedCsfPcr"
                          form={form}
                          setFormValues={setFormValues}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            disabled={labComponentDisabled}
                            form={form}
                            name="dateResultReleasedCsfPcr"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConducted?.includes("rdt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="RDT result"
                          name="rdtResultCsfRdt"
                          form={form}
                          setFormValues={setFormValues}
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
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

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Date result released "
                          name="dateResultReleasedCsfRdt"
                          form={form}
                          setFormValues={setFormValues}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            disabled={labComponentDisabled}
                            form={form}
                            name="dateResultReleasedCsfRdt"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConducted?.includes("culture") && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Culture result"
                        name="resultCsfCulture"
                        form={form}
                        setFormValues={setFormValues}
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
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          name="resultCsfCulture"
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
                  {formValues?.resultCsfCulture === "growth" && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        label="Date result released"
                        name="dateResultReleasedCsfCulture"
                        form={form}
                        setFormValues={setFormValues}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          disabled={labComponentDisabled}
                          form={form}
                          name="dateResultReleasedCsfCulture"
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
