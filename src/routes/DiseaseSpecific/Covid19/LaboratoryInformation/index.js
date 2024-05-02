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
  const [disableOptions, setDisableOptions] = useState(false);

  useEffect(() => {
    if (!userRole) return;
    if (userRole === USER_ROLE.LAB || userRole === USER_ROLE.SUPER) {
      setLabComponentDisabled(false);
    } else {
      setLabComponentDisabled(true);
    }
  }, [userRole]);

  const onChange = (value) => {
    
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
                  collectFormName={true}
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
                      { label: "Nasopharyngeal", value: "nasopharyngeal" },
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
                  collectFormName={true}
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

                  {formValues?.specimenType?.includes("nasalSwab") && (
                    <Col lg={8} md={8} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Nasal swab (Received)"
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
                        <DynamicRadio
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          options={allLookup?.yes_no_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          name="nSwabSpecimenReceived"
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

                  {formValues?.specimenType?.includes("throatSwab") && (
                    <Col lg={8} md={8} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Throat swab (Received)"
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
                        <DynamicRadio
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          options={allLookup?.yes_no_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          name="tSwabSpecimenReceived"
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

                  {formValues?.specimenType?.includes("nasopharyngeal") && (
                    <Col lg={8} md={8} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Nasopharyngeal Swab (Received)"
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
                        <DynamicRadio
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          options={allLookup?.yes_no_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          name="npSwabSpecimenReceived"
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

                  {(formValues?.nSwabSpecimenReceived === "YES" ||
                    formValues?.tSwabSpecimenReceived === "YES" ||
                    formValues?.npSwabSpecimenReceived === "YES") && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date specimen received "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenReceivedNasalThroatNp"
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
                            name="dateSpecimenReceivedNasalThroatNp"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
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
                          <Input
                            placeholder="Enter Lab ID"
                            disabled={labComponentDisabled}
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
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
                          <Radio.Group
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            name="specimenConditionNasalThroatNp"
                            onChange={(e) => {
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              );
                              setDisableOptions(false);
                              setFormValues((prevState) => ({
                                ...prevState,
                                testConductedCsf: [],
                              }));
                              form.setFieldsValue({
                                testConductedCsf: [],
                              });
                              return;
                            }}
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

                      {formValues?.specimenConditionNasalThroatNp &&
                        formValues?.specimenConditionNasalThroatNp ===
                          "not adequate" && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Reason why specimen is not adequate"
                              name="reasonSampleConditionThroatNp"
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
                                id="reasonSampleConditionThroatNp"
                                name="reasonSampleConditionThroatNp"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}

                      {formValues?.specimenType?.length >= 1 && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
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
                              disabled={labComponentDisabled}
                              options={
                                // formValues?.specimenType?.length === 1 &&
                                // formValues?.specimenType[0] === "nSwab"
                                //   ? [
                                //       { label: "PCR", value: "pcr" },
                                //       { label: "serology", value: "serology" },
                                //     ]
                                //   : formValues?.testConductedNasal?.includes(
                                //       "not_done"
                                //     )
                                //   ? [{ label: "Not Done", value: "not_done" }]
                                //   : [
                                //       { label: "PCR", value: "pcr" },
                                //       { label: "RDT", value: "rdt" },
                                //       { label: "Not Done", value: "not_done" },
                                //     ]
                                [
                                  {
                                    label: "PCR",
                                    value: "pcr",
                                    disabled: disableOptions,
                                  },
                                  {
                                    label: "RDT",
                                    value: "rdt",
                                    disabled: disableOptions,
                                  },
                                  {
                                    label: "Not Done",
                                    value: "not_done",
                                  },
                                ]
                              }
                              name="testConductedNasal"
                              onChange={(value) => {
                                handleUpdateInputValues(
                                  "testConductedNasal",
                                  value
                                );
                                if (value.includes("not_done")) {
                                  setDisableOptions(true);
                                  setFormValues((prevState) => ({
                                    ...prevState,
                                    testConductedNasal: ["not_done"],
                                  }));
                                  form.setFieldsValue({
                                    pcrResultNasalThroatNp: undefined,
                                    dateResultReleasedPcr: undefined,
                                    genomicSequencingConducted: undefined,
                                    genoSequencingPcrResult: undefined,
                                    othersGenomicSequencing: undefined,
                                    dateGenomicSequencingResultReleased:
                                      undefined,
                                    rdtResultNasalThroatNp: undefined,
                                    dateResultReleasedRdt: undefined,
                                    testConductedNasal: ["not_done"],
                                  });
                                  return;
                                }
                                setDisableOptions(false);
                                handleUpdateInputValues(
                                  "testConductedNasal",
                                  value
                                );
                              }}
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      <>
                        {formValues?.testConductedNasal?.includes("pcr") && (
                          <>
                            <Divider />
                            <>
                              <Col lg={12} md={12} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
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
                                    disabled={labComponentDisabled}
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
                                    <Radio.Button value="pending">
                                      Pending
                                    </Radio.Button>
                                    <Radio.Button value="not_done">
                                      Not Done
                                    </Radio.Button>
                                  </Radio.Group>
                                </ClearableFormItem>
                              </Col>
                              {!["pending", "not_done"].includes(
                                formValues?.pcrResultNasalThroatNp
                              ) && (
                                <>
                                  <Col lg={12} md={12} sm={24}>
                                    <ClearableFormItem
                                      collectFormName={true}
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
                                        disabled={labComponentDisabled}
                                        form={form}
                                        name="dateResultReleasedPcr"
                                      />
                                    </ClearableFormItem>
                                  </Col>
                                  <Col lg={12} sm={12}>
                                    <ClearableFormItem
                                      form={form}
                                      setFormValues={setFormValues}
                                      label="Genomic sequencing conducted?"
                                      name="genomicSequencingConducted"
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
                                        onChange={(e) =>
                                          handleUpdateInputValues(
                                            e.target.name,
                                            e.target.value
                                          )
                                        }
                                        name="genomicSequencingConducted"
                                      />
                                    </ClearableFormItem>
                                  </Col>
                                </>
                              )}
                              {formValues?.genomicSequencingConducted ===
                                "YES" && (
                                <Col lg={12} md={12} sm={24}>
                                  <ClearableFormItem
                                    collectFormName={true}
                                    setFormValues={setFormValues}
                                    form={form}
                                    label="Genomic sequencing result"
                                    name="genoSequencingPcrResult"
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
                                      options={[
                                        {
                                          id: "B.1.1.7",
                                          value: "B.1.1.7",
                                        },
                                        {
                                          id: "B.1.351",
                                          value: "B.1.351",
                                        },
                                        {
                                          id: "P.1",
                                          value: "P.1",
                                        },
                                        {
                                          id: "B.1.617.2",
                                          value: "B.1.617.2",
                                        },
                                        {
                                          id: "others",
                                          value: "Others",
                                        },
                                      ]}
                                      valueProperty="id"
                                      labelProperty="value"
                                      onChange={(e) =>
                                        handleUpdateInputValues(
                                          e.target.name,
                                          e.target.value
                                        )
                                      }
                                      name="genoSequencingPcrResult"
                                    />
                                  </ClearableFormItem>
                                </Col>
                              )}

                              {formValues?.genoSequencingPcrResult ===
                                "others" && (
                                <Col lg={12} md={12} sm={24}>
                                  <ClearableFormItem
                                    setFormValues={setFormValues}
                                    form={form}
                                    label="Others (Specify)"
                                    name="othersGenomicSequencing"
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
                                      placeholder="Enter other symptoms"
                                      id="specifyOthers"
                                      name="specifyOthers"
                                      onChange={(e) => {}}
                                    />
                                  </ClearableFormItem>
                                </Col>
                              )}
                              {formValues?.genomicSequencingConducted ===
                                "YES" && (
                                <Col lg={12} md={12} sm={24}>
                                  <ClearableFormItem
                                    collectFormName={true}
                                    setFormValues={setFormValues}
                                    form={form}
                                    label="Date genomic sequencing result released "
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    name="dateGenomicSequencingResultReleased"
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
                                      name="dateGenomicSequencingResultReleased"
                                    />
                                  </ClearableFormItem>
                                </Col>
                              )}
                            </>
                            <Divider />
                          </>
                        )}

                        {formValues?.testConductedNasal?.includes("rdt") && (
                          <Row>
                            <Col lg={14} md={14} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
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
                                  disabled={labComponentDisabled}
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
                                  <Radio.Button value="pending">
                                    Pending
                                  </Radio.Button>
                                  <Radio.Button value="not_done">
                                    Not Done
                                  </Radio.Button>
                                </Radio.Group>
                              </ClearableFormItem>
                            </Col>

                            {!["pending", "not_done"].includes(
                              formValues?.rdtResultNasalThroatNp
                            ) && (
                              <Col lg={10} md={10} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
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
                                    disabled={labComponentDisabled}
                                    form={form}
                                    name="dateResultReleasedRdt"
                                  />
                                </ClearableFormItem>
                              </Col>
                            )}
                          </Row>
                        )}
                      </>
                    </>
                  )}

                  {/* Redundant */}
                  {formValues?.specimenType?.includes("blood") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
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
                        <DynamicRadio
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          options={allLookup?.yes_no_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          name="bloodSpecimenReceived"
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

                  {formValues?.bloodSpecimenReceived === "YES" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
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
                          <Radio.Group
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            onChange={(e) =>
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              )
                            }
                            name="specimenConditionBlood"
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

                      {formValues?.specimenConditionBlood &&
                        formValues?.specimenConditionBlood ===
                          "not adequate" && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              setFormValues={setFormValues}
                              form={form}
                              label="Reason why specimen is not adequate"
                              name="reasonSampleConditionBlood"
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
                                id="reasonSampleConditionBlood"
                                name="reasonSampleConditionBlood"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}

                      {formValues?.specimenType?.length >= 1 && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
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
                              disabled={labComponentDisabled}
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
                            collectFormName={true}
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
                              <Radio.Button value="igm positive">
                                IgM Positive
                              </Radio.Button>
                              <Radio.Button value="igm negative">
                                IgM Negative
                              </Radio.Button>
                              <Radio.Button value="igm indeterminate">
                                IGM Indeterminate
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
