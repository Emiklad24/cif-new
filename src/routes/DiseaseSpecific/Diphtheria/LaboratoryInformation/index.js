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
  const [disableOptions, setDisableOptions] = useState(false);
  const [disableOptions2, setDisableOptions2] = useState(false);

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

  const allHealthFacilitiesQuery = useGetHealthFacilities();

  const nameOfTestingLaboratory = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
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

  const typeOfTestDoneNasalOption = [
    {
      label: "Culture",
      value: "culture",
      disabled: disableOptions,
    },
    {
      label: "PCR",
      value: "pcr",
      disabled: disableOptions,
    },
    {
      label: "Not Done",
      value: "not_done",
    },
  ];

  const typeOfTestDoneSkinBiopsyOption = [
    { label: "Culture", value: "culture", disabled: disableOptions2 },
    { label: "PCR", value: "pcr", disabled: disableOptions2 },
    {
      label: "Not Done",
      value: "not_done",
    },
  ];

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

              <Col lg={24} md={24} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
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
                      {
                        label: "Nasal/Nasopharyngeal",
                        value: "nasopharyngeal",
                      },
                      { label: "Skin biopsy", value: "skinBiopsy" },
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
                  form={form}
                  setFormValues={setFormValues}
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

              {canSeeResult && (
                <>
                  <Divider plain>Laboratory result</Divider>

                  {formValues?.specimenType?.includes("nasopharyngeal") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Nasal/Nasopharyngeal specimen received"
                        name="nasopharyngealSampleReceived"
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
                          name="nasopharyngealSampleReceived"
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
                  {formValues?.nasopharyngealSampleReceived === "YES" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date specimen received"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenReceivednasopharyngeal"
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
                            name="dateSpecimenReceivednasopharyngeal"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Laboratory ID"
                          name="laboratoryIdnasopharyngeal"
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
                            id="laboratoryIdnasopharyngeal"
                            name="laboratoryIdnasopharyngeal"
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
                          name="specimenConditionNasopharyngeal"
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
                            name="specimenConditionNasopharyngeal"
                            onChange={(e) => {
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              );

                              setDisableOptions(false);
                              setFormValues((prevState) => ({
                                ...prevState,
                                testConductedSwab: [],
                              }));
                              form.setFieldsValue({
                                testConductedSwab: [],
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

                      {formValues?.specimenConditionNasopharyngeal ===
                        "not adequate" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Reason why specimen is not adequate"
                            name="reasonSampleConditionNasopharyngeal"
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
                              id="reasonSampleConditionNasopharyngeal"
                              name="reasonSampleConditionNasopharyngeal"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.specimenType?.length >= 1 && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Test conducted"
                            name="testConductedSwab"
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
                              options={typeOfTestDoneNasalOption}
                              name="testConductedSwab"
                              onChange={(value) => {
                                handleUpdateInputValues(
                                  "testConductedSwab",
                                  value
                                );
                                if (value.includes("not_done")) {
                                  setDisableOptions(true);
                                  setFormValues((prevState) => ({
                                    ...prevState,
                                    testConductedSwab: ["not_done"],
                                  }));
                                  form.setFieldsValue({
                                    resultSwabPcr: undefined,
                                    dateResultReleasedSwabPcr: undefined,
                                    resultnasopharyngealCulture: undefined,
                                    specifyBacterianasopharyngealCulture:
                                      undefined,
                                    resultnasopharyngealElek: undefined,
                                    testConductedSwab: ["not_done"],
                                  });
                                  return;
                                }
                                setDisableOptions(false);
                                handleUpdateInputValues(
                                  "testConductedSwab",
                                  value
                                );
                              }}
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.testConductedSwab?.includes("pcr") && (
                        <>
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="PCR result"
                              name="resultSwabPcr"
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

                          {formValues?.resultSwabPcr &&
                            !["not done", "pending"].includes(
                              formValues?.resultSwabPcr
                            ) && (
                              <Col lg={12} md={24} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
                                  form={form}
                                  setFormValues={setFormValues}
                                  label="Date result released"
                                  labelCol={{ span: 24 }}
                                  wrapperCol={{ span: 24 }}
                                  name="dateResultReleasedSwabPcr"
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

                      {formValues?.testConductedSwab?.includes("culture") && (
                        <>
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Culture result"
                              name="resultnasopharyngealCulture"
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
                                name="resultnasopharyngealCulture"
                                onChange={(e) =>
                                  handleUpdateInputValues(
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                              >
                                <Radio.Button value="corynebacteriumSpp">
                                  coryne diphtheriae spp
                                </Radio.Button>
                                <Radio.Button value="otherBacteria">
                                  Other bacteria
                                </Radio.Button>
                                <Radio.Button value="no growth">
                                  No Growth
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          {formValues?.resultnasopharyngealCulture ===
                            "otherBacteria" && (
                            <Col lg={12} md={24} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="Specify type of bacteria"
                                name="specifyBacterianasopharyngealCulture"
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
                                  name="specifyBacterianasopharyngealCulture"
                                  placeholder="specify"
                                />
                              </ClearableFormItem>
                            </Col>
                          )}

                          {formValues?.resultnasopharyngealCulture ===
                            "corynebacteriumSpp" && (
                            <>
                              <Col lg={12} md={12} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
                                  form={form}
                                  setFormValues={setFormValues}
                                  label="ELEK result"
                                  name="resultnasopharyngealElek"
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
                                    name="resultnasopharyngealElek"
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

                              {formValues?.resultnasopharyngealElek &&
                                !["not done", "pending"].includes(
                                  formValues?.resultnasopharyngealElek
                                ) && (
                                  <Col lg={12} md={12} sm={24}>
                                    <ClearableFormItem
                                      collectFormName={true}
                                      form={form}
                                      setFormValues={setFormValues}
                                      label="Date Elek result released"
                                      labelCol={{ span: 24 }}
                                      wrapperCol={{ span: 24 }}
                                      name="dateResultReleasedNasopharyngealCultureElek"
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
                                        name="dateResultReleasedNasopharyngealCultureElek"
                                      />
                                    </ClearableFormItem>
                                  </Col>
                                )}
                            </>
                          )}
                        </>
                      )}
                      <Divider />
                    </>
                  )}

                  <>
                    {formValues?.specimenType?.includes("skinBiopsy") && (
                      <Col lg={24} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Skin biopsy specimen received"
                          name="skinBiopsySampleReceived"
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
                            name="skinBiopsySampleReceived"
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

                    {formValues?.skinBiopsySampleReceived === "YES" && (
                      <>
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Date specimen received "
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="dateSpecimenReceivedSkinBiopsy"
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
                              name="dateSpecimenReceivedSkinBiopsy"
                            />
                          </ClearableFormItem>
                        </Col>

                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Laboratory ID"
                            name="laboratoryIdSkinBiopsy"
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
                            form={form}
                            setFormValues={setFormValues}
                            label="Specimen condition"
                            name="specimenConditionSkinBiopsy"
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
                              name="specimenConditionSkinBiopsy"
                              onChange={(e) => {
                                handleUpdateInputValues(
                                  e.target.name,
                                  e.target.value
                                );

                                setDisableOptions2(false);
                                setFormValues((prevState) => ({
                                  ...prevState,
                                  testConductedSkinBiopsy: [],
                                }));
                                form.setFieldsValue({
                                  testConductedSkinBiopsy: [],
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

                        {formValues?.specimenConditionSkinBiopsy ===
                          "not adequate" && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Reason why specimen is not adequate"
                              name="reasonSampleConditionSkinBiopsy"
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
                                id="reasonSampleConditionSkinBiopsy"
                                name="reasonSampleConditionSkinBiopsy"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}

                        {formValues?.specimenType?.length >= 1 && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Test conducted"
                              name="testConductedSkinBiopsy"
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
                                options={typeOfTestDoneSkinBiopsyOption}
                                name="testConductedSkinBiopsy"
                                onChange={(value) => {
                                  handleUpdateInputValues(
                                    "testConductedSkinBiopsy",
                                    value
                                  );
                                  if (value.includes("not_done")) {
                                    setDisableOptions2(true);
                                    setFormValues((prevState) => ({
                                      ...prevState,
                                      testConductedSkinBiopsy: ["not_done"],
                                    }));
                                    form.setFieldsValue({
                                      resultSkinBiopsyCulture: undefined,
                                      specifyBacteriaSkinBiopsyCulture: undefined,
                                      resultSkinBiopsyElek: undefined,
                                      resultSkinBiopsyPcr: undefined,
                                      dateResultReleasedSkinBiopsyPcr: undefined,
                                      testConductedSkinBiopsy: ["not_done"],
                                    });
                                    return;
                                  }
                                  setDisableOptions2(false);
                                  handleUpdateInputValues(
                                    "testConductedSkinBiopsy",
                                    value
                                  );
                                }}
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                        {formValues?.testConductedSkinBiopsy?.includes(
                          "culture"
                        ) && (
                          <>
                            <Col lg={12} md={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="Culture result"
                                name="resultSkinBiopsyCulture"
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
                                  name="resultSkinBiopsyCulture"
                                  onChange={(e) =>
                                    handleUpdateInputValues(
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                >
                                  <Radio.Button value="corynebacteriumSpp">
                                    coryne diphtheriae spp
                                  </Radio.Button>
                                  <Radio.Button value="otherBacteria">
                                    Other bacteria
                                  </Radio.Button>
                                  <Radio.Button value="no growth">
                                    No Growth
                                  </Radio.Button>
                                </Radio.Group>
                              </ClearableFormItem>
                            </Col>
                            {formValues?.resultSkinBiopsyCulture ===
                              "otherBacteria" && (
                              <Col lg={12} md={12} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
                                  form={form}
                                  setFormValues={setFormValues}
                                  label="Specify type of bacteria"
                                  name="specifyBacteriaSkinBiopsyCulture"
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
                                    name="specifyBacteriaSkinBiopsyCulture"
                                    placeholder="specify"
                                  />
                                </ClearableFormItem>
                              </Col>
                            )}

                            {formValues?.resultSkinBiopsyCulture ===
                              "corynebacteriumSpp" && (
                              <>
                                <Col lg={12} md={12} sm={24}>
                                  <ClearableFormItem
                                    collectFormName={true}
                                    form={form}
                                    setFormValues={setFormValues}
                                    label="ELEK result"
                                    name="resultSkinBiopsyElek"
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
                                      name="resultSkinBiopsyElek"
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

                                {formValues?.resultSkinBiopsyElek &&
                                  !["not done", "pending"].includes(
                                    formValues?.resultSkinBiopsyElek
                                  ) && (
                                    <Col lg={12} md={12} sm={24}>
                                      <ClearableFormItem
                                        collectFormName={true}
                                        form={form}
                                        setFormValues={setFormValues}
                                        label="Date Elek result released"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        name="dateResultReleasedSkinBiopsyCultureElek"
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
                                          name="dateResultReleasedSkinBiopsyCultureElek"
                                        />
                                      </ClearableFormItem>
                                    </Col>
                                  )}
                              </>
                            )}
                          </>
                        )}

                        {formValues?.testConductedSkinBiopsy?.includes(
                          "pcr"
                        ) && (
                          <>
                            <Col lg={12} md={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="PCR result"
                                name="resultSkinBiopsyPcr"
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
                                  name="resultSkinBiopsyPcr"
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

                            {formValues?.resultSkinBiopsyPcr &&
                              !["pending", "not done"].includes(
                                formValues?.resultSkinBiopsyPcr
                              ) && (
                                <Col lg={12} md={12} sm={24}>
                                  <ClearableFormItem
                                    collectFormName={true}
                                    form={form}
                                    setFormValues={setFormValues}
                                    label="Date result released "
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    name="dateResultReleasedSkinBiopsyPcr"
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
                                      name="dateResultReleasedSkinBiopsyPcr"
                                    />
                                  </ClearableFormItem>
                                </Col>
                              )}
                          </>
                        )}
                      </>
                    )}
                  </>
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
