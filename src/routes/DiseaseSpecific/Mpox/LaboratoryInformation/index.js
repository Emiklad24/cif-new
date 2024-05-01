import { Checkbox, Col, Collapse, Divider, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import { USER_ROLE } from "constants/ActionTypes";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "styles/pages/form.less";
import useFormStore from "../../../../store/useFormStore";
import { useShallow } from "zustand/react/shallow";
import { filterLabByStateAndDisease } from "../../../../constants/AllLaboratory";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;
  const [labComponentDisabled, setLabComponentDisabled] = useState(false);
  const { userRole } = useSelector(({ common }) => common);

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
  const _formValues = form?.getFieldsValue(true);
  const { selectedDiseaseArea } = useFormStore(
    useShallow((state) => ({
      selectedDiseaseArea: state.selectedDiseaseArea,
    }))
  );
  const { data: allLookup } = useFetchAllLookup();
  
  

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const canSeeResult =
    USER_ROLE.LAB === userRole ||
    USER_ROLE.SUPER === userRole ||
    USER_ROLE.VIEW === userRole;

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
              label="Specimen collected"
              name="specimenCollected"
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
                  <CustomDatePicker form={form} name="dateSpecimenCollected" />
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
                      { label: "Blood", value: "blood" },
                      { label: "Crust", value: "crust" },
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
                    collectFormName={true}
                    label="Date specimen sent"
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
                    <CustomDatePicker form={form} name="dateSpecimenSent" />
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
                    options={filterLabByStateAndDisease(
                      _formValues?.stateOfReporting,
                      selectedDiseaseArea?.value
                    )}
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

              {canSeeResult && (
                <>
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
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
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
                          label="Date specimen received "
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
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            disabled={labComponentDisabled}
                            placeholder="Enter Lab ID"
                            id="laboratoryIdBlood"
                            name="laboratoryIdBlood"
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
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
                          >
                            <Radio.Button value="adequate">
                              Adequate
                            </Radio.Button>
                            <Radio.Button value="not adequate">
                              Not Adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.specimenConditionBlood ===
                        "not adequate" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Reason why specimen is not adequate"
                            name="reasonSpecimenNotAdequateBloodSpecimen"
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
                              name="reasonSpecimenNotAdequateBloodSpecimen"
                              placeholder="Reason why"
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
                                // { label: "PCR", value: "pcr" },
                                { label: "Serology", value: "serology" },
                              ]}
                              name="bloodTestConducted"
                              onChange={(value) =>
                                handleUpdateInputValues(
                                  "bloodTestConducted",
                                  value
                                )
                              }
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {/* {formValues?.bloodTestConducted?.includes("pcr") && (
                        <>
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
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          {["positive", "negative", "indeterminate"].includes(
                            formValues?.resultBloodPcr
                          ) && (
                            <Col lg={12} md={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                label="Date result released "
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
                        </>
                      )} */}

                      {formValues?.bloodTestConducted?.includes("serology") && (
                        <>
                          <Col lg={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              label="Serology (HIV result)"
                              name="serologyResultBlood"
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
                                name="serologyResultBlood"
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
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="not done">
                                  Not Done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          {["positive", "negative", "indeterminate"].includes(
                            formValues?.serologyResultBlood
                          ) && (
                            <Col lg={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                label="Date Serology (HIV result) released"
                                name="dateResultReleasedBloodSerology"
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
                                  name="dateResultReleasedBloodSerology"
                                />
                              </ClearableFormItem>
                            </Col>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {formValues?.specimenType?.includes("crust") && (
                    <>
                      <Divider plain />
                      <Col lg={24} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Crust specimen received"
                          name="crustSampleReceived"
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
                            name="crustSampleReceived"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
                  )}

                  {formValues?.crustSampleReceived === "YES" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Date specimen received "
                          name="dateSpecimenReceivedCrust"
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
                            name="dateSpecimenReceivedCrust"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Laboratory ID"
                          name="laboratoryIdCrust"
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
                          name="specimenConditionCrust"
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
                            name="specimenConditionCrust"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
                          >
                            <Radio.Button value="adequate">
                              Adequate
                            </Radio.Button>
                            <Radio.Button value="not adequate">
                              Not Adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.specimenConditionCrust ===
                        "not adequate" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Reason why specimen is not adequate"
                            name="reasonSpecimenNotAdequateCrustSpecimen"
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
                              name="reasonSpecimenNotAdequateCrustSpecimen"
                              placeholder="Reason why"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.specimenType?.length >= 1 && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            label="Test conducted"
                            name="testConductedCrust"
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
                              options={[{ label: "PCR", value: "pcr" }]}
                              name="testConductedCrust"
                              onChange={(value) =>
                                handleUpdateInputValues(
                                  "testConductedCrust",
                                  value
                                )
                              }
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.testConductedCrust?.includes("pcr") && (
                        <>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              label="PCR result"
                              name="resultCrustPcr"
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
                                name="resultCrustPcr"
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
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="not done">
                                  Not Done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          {["positive", "negative", "indeterminate"].includes(
                            formValues?.resultCrustPcr
                          ) && (
                            <Col lg={12} md={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                label="Date result released "
                                name="dateResultReleasedCrustPcr"
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
                                  name="dateResultReleasedCrustPcr"
                                />
                              </ClearableFormItem>
                            </Col>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {formValues?.specimenType?.includes("swab") && (
                    <>
                      <Divider plain />
                      <Col lg={24} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Swab specimen received"
                          name="swabSampleReceived"
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
                            name="swabSampleReceived"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
                  )}
                  {formValues?.swabSampleReceived === "YES" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Date specimen received "
                          name="dateSpecimenReceivedSwab"
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
                            name="dateSpecimenReceivedSwab"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          label="Laboratory ID"
                          name="laboratoryIdSwab"
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
                          name="specimenConditionSwab"
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
                            name="specimenConditionSwab"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
                          >
                            <Radio.Button value="adequate">
                              Adequate
                            </Radio.Button>
                            <Radio.Button value="not adequate">
                              Not Adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.specimenConditionSwab === "not adequate" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Reason why specimen is not adequate"
                            name="reasonSpecimenNotAdequateSwabSpecimen"
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
                              name="reasonSpecimenNotAdequateSwabSpecimen"
                              placeholder="Reason why"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.specimenType?.length >= 1 && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            label="Test conducted"
                            name="testConductedSwab"
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
                              options={[{ label: "PCR", value: "pcr" }]}
                              name="testConductedSwab"
                              onChange={(value) =>
                                handleUpdateInputValues(
                                  "testConductedSwab",
                                  value
                                )
                              }
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.testConductedSwab?.includes("pcr") && (
                        <>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              label="PCR result"
                              name="resultSwabPcr"
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
                                name="resultSwabPcr"
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
                                <Radio.Button value="pending">
                                  Pending
                                </Radio.Button>
                                <Radio.Button value="not done">
                                  Not Done
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          {["positive", "negative", "indeterminate"].includes(
                            formValues?.resultSwabPcr
                          ) && (
                            <Col lg={12} md={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                label="Date result released "
                                name="dateResultReleasedSwabPcr"
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
                                  name="dateResultReleasedSwabPcr"
                                />
                              </ClearableFormItem>
                            </Col>
                          )}
                        </>
                      )}
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
