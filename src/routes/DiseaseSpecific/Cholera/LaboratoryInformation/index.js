import { Checkbox, Col, Collapse, Divider, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import DynamicSelect from "components/Custom/DynamicSelect";
import { USER_ROLE } from "constants/ActionTypes";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import useGetHealthFacilities from "hooks/useGetHealthFacilities.hook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "styles/pages/form.less";

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

  const customDividerStyle = {
    "&.ant-divider-inner-text": {
      border: "4px solid #000",
    },
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const { data: allLookup } = useFetchAllLookup();
  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const laboratoryData = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );

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
          <Col lg={8} md={24} sm={24}>
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
              <Col lg={8} md={24} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="Date specimen was collected"
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

              <Col lg={8} md={24} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="Type of specimen collected"
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
                      { label: "Stool", value: "stool" },
                      { label: "Rectal swab", value: "rectalSwab" },
                    ]}
                    name="specimenType"
                    onChange={(value) => {
                      handleUpdateInputValues("specimenType", value);
                    }}
                  />
                </ClearableFormItem>
              </Col>
              {formValues?.specimenType?.includes("stool") && (
                <>
                  <Col lg={12} md={24} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Name of testing laboratory (stool)"
                      name="nameOfTestingLaboratoryStool"
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
                        options={laboratoryData}
                        valueProperty="id"
                        labelProperty="name"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children
                            ?.toLowerCase()
                            .localeCompare(optionB.children?.toLowerCase())
                        }
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={24} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen was sent (stool)"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenSentStool"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenSentStool"
                      />
                    </ClearableFormItem>
                  </Col>
                </>
              )}

              {formValues?.specimenType?.includes("rectalSwab") && (
                <>
                  <Col lg={12} md={24} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Name of testing laboratory (rectal swab)"
                      name="nameOfTestingLaboratoryRectalSwab"
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
                        options={laboratoryData}
                        valueProperty="id"
                        labelProperty="name"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.children
                            ?.toLowerCase()
                            .localeCompare(optionB.children?.toLowerCase())
                        }
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={24} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen was sent (rectal swab)"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenSentSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenSentSwab"
                      />
                    </ClearableFormItem>
                  </Col>
                </>
              )}
              {canSeeResult && (
                <>
                  <Divider className={customDividerStyle}>
                    Laboratory Result
                  </Divider>
                  {/*<Col lg={8} md={24} sm={24}>*/}
                  {/*  <ClearableFormItem*/}
                  {/*    collectFormName={true}*/}
                  {/*    form={form}*/}
                  {/*    setFormValues={setFormValues}*/}
                  {/*    label="RDT result conducted"*/}
                  {/*    name="rdtTestConducted"*/}
                  {/*    labelCol={{ span: 24 }}*/}
                  {/*    wrapperCol={{ span: 24 }}*/}
                  {/*    rules={[*/}
                  {/*      {*/}
                  {/*        required: true,*/}
                  {/*        message: "This field is required",*/}
                  {/*      },*/}
                  {/*    ]}*/}
                  {/*  >*/}
                  {/*    <DynamicRadio*/}
                  {/*      disabled={labComponentDisabled}*/}
                  {/*      buttonStyle="solid"*/}
                  {/*      options={allLookup?.yes_no_type || []}*/}
                  {/*      valueProperty="id"*/}
                  {/*      labelProperty="value"*/}
                  {/*      name="rdtTestConducted"*/}
                  {/*      onChange={(e) =>*/}
                  {/*        handleUpdateInputValues(e.target.name, e.target.value)*/}
                  {/*      }*/}
                  {/*    />*/}
                  {/*  </ClearableFormItem>*/}
                  {/*</Col>*/}

                  {/*{formValues?.rdtTestConducted === "YES" && (*/}
                  {/*  <Col lg={8} md={24} sm={24}>*/}
                  {/*    <ClearableFormItem*/}
                  {/*      collectFormName={true}*/}
                  {/*      form={form}*/}
                  {/*      setFormValues={setFormValues}*/}
                  {/*      label="RDT result"*/}
                  {/*      name="rdtTestResult"*/}
                  {/*      labelCol={{ span: 24 }}*/}
                  {/*      wrapperCol={{ span: 24 }}*/}
                  {/*      rules={[*/}
                  {/*        {*/}
                  {/*          required: true,*/}
                  {/*          message: "This field is required",*/}
                  {/*        },*/}
                  {/*      ]}*/}
                  {/*    >*/}
                  {/*      <Radio.Group*/}
                  {/*        disabled={labComponentDisabled}*/}
                  {/*        buttonStyle="solid"*/}
                  {/*      >*/}
                  {/*        <Radio.Button value="positive">Positive</Radio.Button>*/}
                  {/*        <Radio.Button value="negative">Negative</Radio.Button>*/}
                  {/*        <Radio.Button value="invalid">Invalid</Radio.Button>*/}
                  {/*      </Radio.Group>*/}
                  {/*    </ClearableFormItem>*/}
                  {/*  </Col>*/}
                  {/*)}*/}

                  {formValues?.specimenType?.includes("stool") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Stool specimen received"
                        name="stoolSwabSpecimenReceived"
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
                          name="stoolSwabSpecimenReceived"
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

                  {formValues?.stoolSwabSpecimenReceived === "YES" && (
                    <>
                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date specimen received"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenReceivedStool"
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
                            name="dateSpecimenReceivedStool"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Specimen condition?"
                          name="specimenConditionStool"
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
                            name="specimenConditionStool"
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
                            <Radio.Button value="notadequate">
                              Not adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.specimenConditionStool === "notadequate" && (
                        <Col lg={12} md={24} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Please specify reason why specimen is not adequate"
                            name="stoolNotAdequateReason"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                          >
                            <Input
                              disabled={labComponentDisabled}
                              placeholder="Reason"
                              id="stoolNotAdequateReason"
                              name="stoolNotAdequateReason"
                              type="text"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Type of test done"
                          name="typeOfTestDoneStool"
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
                              {
                                label: "Culture",
                                value: "culture",
                              },
                              {
                                label: "RDT",
                                value: "rdt",
                              },
                            ]}
                            name="typeOfTestDoneStool"
                            onChange={(value) =>
                              handleUpdateInputValues(
                                "typeOfTestDoneStool",
                                value
                              )
                            }
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date of specimen tested"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenTestedStool"
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
                            name="dateSpecimenTestedStool"
                          />
                        </ClearableFormItem>
                      </Col>

                      {formValues?.typeOfTestDoneStool?.includes("culture") && (
                        <>
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Culture test result"
                              name="testResultStoolCulture"
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
                                name="testResultStoolCulture"
                                onChange={(e) =>
                                  handleUpdateInputValues(
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                              >
                                <Radio.Button value="enteropathogen_isolated">
                                  Enteropathogen Isolated
                                </Radio.Button>
                                {/*<Radio.Button value="vibro_cholerae_I">*/}
                                {/*  Vibro Cholerae Isolated*/}
                                {/*</Radio.Button>*/}
                                {/*<Radio.Button value="no_vibro_cholerae">*/}
                                {/*  No Vibro Cholerae*/}
                                {/*</Radio.Button>*/}
                                <Radio.Button value="no_enteropathogen">
                                  No Enteropathogen
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>

                          {["enteropathogen_isolated"].includes(
                            formValues?.testResultStoolCulture
                          ) && (
                            <Col lg={12} md={24} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="Enteropathogen isolated"
                                name="enteropathogenIsolated"
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
                                    {
                                      label: "Vibro cholerae",
                                      value: "vibro_cholerae_I",
                                    },
                                    {
                                      label: "E Coli",
                                      value: "EColi",
                                    },
                                    {
                                      label: "Shigella",
                                      value: "Shigella",
                                    },
                                    {
                                      label: "Salmonella",
                                      value: "salmonella",
                                    },
                                    {
                                      label: "Others",
                                      value: "Others",
                                    },
                                  ]}
                                  name="enteropathogenIsolated"
                                  onChange={(value) =>
                                    handleUpdateInputValues(
                                      "enteropathogenIsolated",
                                      value
                                    )
                                  }
                                />
                              </ClearableFormItem>
                            </Col>
                          )}

                          {formValues?.enteropathogenIsolated?.includes(
                            "Others"
                          ) && (
                            <Col lg={12} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="Please specify other enteropathogen isolated"
                                name="otherEnteropathogenIsolated"
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
                                  placeholder="Other enteropathogen isolated"
                                  id="otherEnteropathogenIsolated"
                                  name="otherEnteropathogenIsolated"
                                  type="text"
                                />
                              </ClearableFormItem>
                            </Col>
                          )}

                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedStool"
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
                                name="dateResultReleasedStool"
                              />
                            </ClearableFormItem>
                          </Col>
                        </>
                      )}

                      {formValues?.typeOfTestDoneStool?.includes("rdt") && (
                        <>
                          <Col lg={24} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="RDT result"
                              name="rdtTestResult"
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
                                <Radio.Button value="invalid">
                                  Invalid
                                </Radio.Button>
                              </Radio.Group>
                            </ClearableFormItem>
                          </Col>
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released (RDT)"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedRDT"
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
                                name="dateResultReleasedStool"
                              />
                            </ClearableFormItem>
                          </Col>
                        </>
                      )}

                      <Divider />
                    </>
                  )}

                  {formValues?.specimenType?.includes("rectalSwab") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Rectal swab specimen received"
                        name="rectalSwabSpecimenReceived"
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
                          name="rectalSwabSpecimenReceived"
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

                  {formValues?.rectalSwabSpecimenReceived === "YES" && (
                    <Row>
                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date specimen received"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenReceivedRectalSwab"
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
                            name="dateSpecimenReceivedRectalSwab"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Specimen condition?"
                          name="specimenConditionRectalSwab"
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
                            name="specimenConditionRectalSwab"
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
                            <Radio.Button value="notadequate">
                              Not adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.specimenConditionRectalSwab ===
                        "notadequate" && (
                        <Col lg={12} md={24} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Please specify reason why specimen is not adequate"
                            name="rectalSwabNotAdequateReason"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                          >
                            <Input
                              disabled={labComponentDisabled}
                              placeholder="Other symptoms"
                              id="rectalSwabNotAdequateReason "
                              name="rectalSwabNotAdequateReason"
                              type="text"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Type of test done"
                          name="typeOfTestDoneRectalSwab"
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
                              { label: "Microscopy", value: "microscopy" },
                              { label: "Culture", value: "culture" },
                            ]}
                            name="typeOfTestDoneRectalSwab"
                            onChange={(value) =>
                              handleUpdateInputValues(
                                "typeOfTestDoneRectalSwab",
                                value
                              )
                            }
                          />
                        </ClearableFormItem>
                      </Col>

                      {formValues?.typeOfTestDoneRectalSwab?.includes(
                        "microscopy"
                      ) && (
                        <Col lg={12} md={24} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Microscopy test result"
                            name="testResultRectalSwabMicroscopy"
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
                              <Radio.Button value="pending">
                                Pending
                              </Radio.Button>
                            </Radio.Group>
                          </ClearableFormItem>
                        </Col>
                      )}

                      {formValues?.typeOfTestDoneRectalSwab?.includes(
                        "culture"
                      ) && (
                        <Col lg={12} md={24} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Culture test result"
                            name="testResultRectalSwabCulture"
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
                              <Radio.Button value="pending">
                                Pending
                              </Radio.Button>
                            </Radio.Group>
                          </ClearableFormItem>
                        </Col>
                      )}

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date of specimen tested"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateSpecimenTestedRectalSwab"
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
                            name="dateSpecimenTestedRectalSwab"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={24} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Test result"
                          name="testResultRectalSwab"
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
                            name="testResultRectalSwab"
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.testResultRectalSwab &&
                        !["pending", "not done"].includes(
                          formValues?.testResultRectalSwab
                        ) && (
                          <Col lg={12} md={24} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedRectalSwab"
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                disabled={labComponentDisabled}
                                name="dateResultReleasedRectalSwab"
                                form={form}
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
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
