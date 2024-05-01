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
import { filterLabByStateAndDisease } from "../../../../constants/AllLaboratory";
import { useShallow } from "zustand/react/shallow";
import useFormStore from "../../../../store/useFormStore";

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
                        label: "Nasal/Nasopharyngeal/Skin biopsy(State)",
                        value: "nasopharyngeal",
                      },
                      {
                        label: "Nasal/Nasopharyngeal/Skin biopsy(NRL)",
                        value: "nasopharyngealNRL",
                      },
                    ]}
                    name="specimenType"
                    onChange={(value) =>
                      handleUpdateInputValues("specimenType", value)
                    }
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.specimenType?.length >= 1 &&
                formValues?.specimenType?.includes("nasopharyngeal") && (
                  <>
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

                    <Col lg={12} md={12} sm={12} xs={24}>
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  </>
                )}
              {formValues?.specimenType?.length >= 1 &&
                formValues?.specimenType?.includes("nasopharyngealNRL") && (
                  <>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Date specimen sent (NRL)"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="dateSpecimenSentNRL"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          form={form}
                          name="dateSpecimenSentNRL"
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={12} md={12} sm={12} xs={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Name Of testing laboratory (NRL)"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="nameOfTestingLaboratoryNRL"
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
                          defaultValue={136529}
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  </>
                )}
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

                  {formValues?.specimenType?.includes("nasopharyngealNRL") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Nasal/Nasopharyngeal specimen received (NRL)"
                        name="nasopharyngealSampleReceivedNRL"
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
                          name="nasopharyngealSampleReceivedNRL"
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
                  {formValues?.nasopharyngealSampleReceivedNRL === "YES" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date specimen received (NRL)"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenReceivednasopharyngealNRL"
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
                            name="dateSpecimenReceivednasopharyngealNRL"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Laboratory ID (NRL)"
                          name="laboratoryIdnasopharyngealNRL"
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
                            id="laboratoryIdnasopharyngealNRL"
                            name="laboratoryIdnasopharyngealNRL"
                            onChange={(e) => {}}
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Specimen condition (NRL)"
                          name="specimenConditionNasopharyngealNRL"
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
                            name="specimenConditionNasopharyngealNRL"
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

                      {formValues?.specimenConditionNasopharyngealNRL ===
                        "not adequate" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Reason why specimen is not adequate"
                            name="reasonSampleConditionNasopharyngealNRL"
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
                              id="reasonSampleConditionNasopharyngealNRL"
                              name="reasonSampleConditionNasopharyngealNRL"
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
                            label="Test conducted (NRL)"
                            name="testConductedSwabNRL"
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
                              name="testConductedSwabNRL"
                              onChange={(value) => {
                                handleUpdateInputValues(
                                  "testConductedSwabNRL",
                                  value
                                );
                                if (value.includes("not_done")) {
                                  setDisableOptions(true);
                                  setFormValues((prevState) => ({
                                    ...prevState,
                                    testConductedSwabNRL: ["not_done"],
                                  }));
                                  form.setFieldsValue({
                                    resultSwabPcr: undefined,
                                    dateResultReleasedSwabPcr: undefined,
                                    resultnasopharyngealCulture: undefined,
                                    specifyBacterianasopharyngealCulture:
                                      undefined,
                                    resultnasopharyngealElek: undefined,
                                    testConductedSwabNRL: ["not_done"],
                                  });
                                  return;
                                }
                                setDisableOptions(false);
                                handleUpdateInputValues(
                                  "testConductedSwabNRL",
                                  value
                                );
                              }}
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.testConductedSwabNRL?.includes("pcr") && (
                        <>
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="PCR result(NRL)"
                              name="resultSwabPcrNRL"
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
                                name="resultSwabPcrNRL"
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

                          {formValues?.resultSwabPcrNRL &&
                            !["not done", "pending"].includes(
                              formValues?.resultSwabPcr
                            ) && (
                              <Col lg={12} md={24} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
                                  form={form}
                                  setFormValues={setFormValues}
                                  label="Date result released (NRL)"
                                  labelCol={{ span: 24 }}
                                  wrapperCol={{ span: 24 }}
                                  name="dateResultReleasedSwabPcrNRL"
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
                                    name="dateResultReleasedSwabPcrNRL"
                                  />
                                </ClearableFormItem>
                              </Col>
                            )}
                        </>
                      )}

                      {formValues?.testConductedSwabNRL?.includes(
                        "culture"
                      ) && (
                        <>
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Culture result(NRL)"
                              name="resultnasopharyngealCultureNRL"
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
                                name="resultnasopharyngealCultureNRL"
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

                          {formValues?.resultnasopharyngealCultureNRL ===
                            "otherBacteria" && (
                            <Col lg={12} md={24} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="Specify type of bacteria (NRL)"
                                name="specifyBacterianasopharyngealCultureNRL"
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
                                  name="specifyBacterianasopharyngealCultureNRL"
                                  placeholder="specify"
                                />
                              </ClearableFormItem>
                            </Col>
                          )}

                          {formValues?.resultnasopharyngealCultureNRL ===
                            "corynebacteriumSpp" && (
                            <>
                              <Col lg={12} md={12} sm={24}>
                                <ClearableFormItem
                                  collectFormName={true}
                                  form={form}
                                  setFormValues={setFormValues}
                                  label="ELEK result (NRL)"
                                  name="resultnasopharyngealElekNRL"
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
                                    name="resultnasopharyngealElekNRL"
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

                              {formValues?.resultnasopharyngealElekNRL &&
                                !["not done", "pending"].includes(
                                  formValues?.resultnasopharyngealElekNRL
                                ) && (
                                  <Col lg={12} md={12} sm={24}>
                                    <ClearableFormItem
                                      collectFormName={true}
                                      form={form}
                                      setFormValues={setFormValues}
                                      label="Date Elek result released(NRL)"
                                      labelCol={{ span: 24 }}
                                      wrapperCol={{ span: 24 }}
                                      name="dateResultReleasedNasopharyngealCultureElekNRL"
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
                                        name="dateResultReleasedNasopharyngealCultureElekNRL"
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
