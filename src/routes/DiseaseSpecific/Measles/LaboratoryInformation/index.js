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
                      { label: "Blood/Serum", value: "bloodSerum" },
                      {
                        label: "Nasopharyngeal swab",
                        value: "nasopharyngealSwab",
                      },
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

              {canSeeResult && (
                <>
                  <Divider plain>Laboratory result</Divider>
                  {/* ======================================== */}
                  {formValues?.specimenType?.includes("bloodSerum") && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Blood/Serum sample received"
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
                          disabled={labComponentDisabled}
                          buttonStyle="solid"
                          options={allLookup?.yes_no_type || []}
                          valueProperty="id"
                          labelProperty="value"
                          name="bloodSerumSampleReceived"
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
                          name="bloodSerumDateSpecimenReceived"
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
                            name="bloodSerumDateSpecimenReceived"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Laboratory ID"
                          name="bloodSerumLaboratoryId"
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
                            id="bloodSerumLaboratoryId"
                            name="bloodSerumLaboratoryId"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Specimen condition"
                          name="bloodSerumSpecimenCondition"
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
                            name="bloodSerumSpecimenCondition"
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
                            <Radio.Button value="notAdequate">
                              Not Adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.bloodSerumSpecimenCondition &&
                        formValues?.bloodSerumSpecimenCondition ===
                          "notAdequate" && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Reason why specimen is not adequate"
                              name="bloodSerumReasonSampleCondition"
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
                                id="bloodSerumReasonSampleCondition"
                                name="bloodSerumReasonSampleCondition"
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
                          name="bloodSerumMeaslesSerologyResult"
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
                            name="bloodSerumMeaslesSerologyResult"
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

                      {formValues?.bloodSerumMeaslesSerologyResult &&
                        [
                          "igm positive",
                          "igm negative",
                          "igm indeterminate",
                        ]?.includes(
                          formValues?.bloodSerumMeaslesSerologyResult
                        ) && (
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
                                disabled={labComponentDisabled}
                                form={form}
                                name="dateResultReleasedMeasles"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}

                      {["igm negative", "igm indeterminate"]?.includes(
                        formValues?.bloodSerumMeaslesSerologyResult
                      ) && (
                        <Row>
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Rubella serology result"
                              name="bloodSerumRubellaSerologyResult"
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
                                name="bloodSerumRubellaSerologyResult"
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

                          {formValues?.bloodSerumRubellaSerologyResult &&
                            [
                              "igm positive",
                              "igm negative",
                              "igm indeterminate",
                            ]?.includes(
                              formValues?.bloodSerumRubellaSerologyResult
                            ) && (
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
                                    disabled={labComponentDisabled}
                                    form={form}
                                    name="dateResultReleasedRubella"
                                  />
                                </ClearableFormItem>
                              </Col>
                            )}

                          <Divider />
                        </Row>
                      )}
                    </>
                  )}
                  {/* ================================ */}

                  {formValues?.specimenType?.includes("nasopharyngealSwab") && (
                    <>
                      <Divider />
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            options={allLookup?.yes_no_type || []}
                            valueProperty="id"
                            labelProperty="value"
                            name="nasopharyngealSwabReceived"
                            onChange={(e) => {
                              handleUpdateInputValues(
                                e.target.name,
                                e.target.value
                              );
                            }}
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
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
                            disabled={labComponentDisabled}
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
                            disabled={labComponentDisabled}
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            name="sampleConditionNasopharyngealSwab"
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
                              disabled={labComponentDisabled}
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
                            disabled={labComponentDisabled}
                            buttonStyle="solid"
                            name="pcrResult"
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
                                disabled={labComponentDisabled}
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
            </>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
