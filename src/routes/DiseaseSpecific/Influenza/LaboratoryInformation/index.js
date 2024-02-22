/* eslint-disable no-unused-vars */
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
  const { userRole } = useSelector(({ common }) => common);

  const [labComponentDisabled, setLabComponentDisabled] = useState(true);

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

  const { data: allLookup } = useFetchAllLookup();

  const allHealthFacilitiesQuery = useGetHealthFacilities();

  const nameOfTestingLaboratory = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );

  /**
   * Update the form values
   * @param {string} inputName
   * @param {string} value
   */
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
      <Panel header="Laboratory Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
              form={form}
              setFormValues={setFormValues}
              label="Specimen collected?"
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
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of specimen collected"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={symptom_date ? moment(symptom_date) : null}
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
                      message: "Select a specimen type!",
                    },
                  ]}
                >
                  <CheckboxGroup
                    options={[
                      {
                        label: "Throat/Oropharyngeal",
                        value: "throat_oropharyngeal",
                      },
                      {
                        label: "Nasal/Nasopahryngeal",
                        value: "nasal_nasopahryngeal ",
                      },
                    ]}
                    name="specimenType"
                    onChange={(value) =>
                      handleUpdateInputValues("specimenType", value)
                    }
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
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

              <Col lg={12} md={8} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of sample sent"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateSampleSent"
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
                    name="dateSampleSent"
                  />
                </ClearableFormItem>
              </Col>

              {canSeeResult && (
                <>
                  <Col sm={24}>
                    <Divider plain>Laboratory result</Divider>
                  </Col>

                  {formValues?.specimenType?.length > 0 && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Type of specimen received?"
                          name="typeOfSpecimenReceived"
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
                            options={formValues?.specimenType?.map(
                              (specimen) => ({
                                label:
                                  specimen === "throat_oropharyngeal"
                                    ? "Throat/Oropharyngeal"
                                    : "Nasal/Nasopahryngeal",
                                value: specimen,
                              })
                            )}
                            name="typeOfSpecimenReceived"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={8} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date of specimen received"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={symptom_date ? moment(symptom_date) : null}
                          name="dateSpecimenReceived"
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
                            name="dateSpecimenReceived"
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Laboratory ID"
                          name="laboratoryId"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Input
                            disabled={labComponentDisabled}
                            placeholder="Enter specimen Id"
                            onChange={(e) => {}}
                          />
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Specimen condition?"
                          name="specimenCondition"
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
                            disabled={labComponentDisabled}
                          >
                            <Radio.Button value="adequate">
                              Adequate
                            </Radio.Button>
                            <Radio.Button value="not adequate">
                              Not adequate
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Type of test conducted?"
                          name="typeOfTestConducted"
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
                            name="typeOfTestConducted"
                            onChange={(value) =>
                              handleUpdateInputValues(
                                "typeOfTestConducted",
                                value
                              )
                            }
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
                  )}
                  {formValues?.typeOfTestConducted?.includes("pcr") && (
                    <>
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
                            disabled={labComponentDisabled}
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
                            <Radio.Button value="not_done">
                              Not Done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {formValues?.pcrResult &&
                        !["not_done", "pending"].includes(
                          formValues?.pcrResult
                        ) && (
                          <>
                            <Col lg={12} md={8} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
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

                            {/* <Col lg={12} md={8} sm={24}>
                              <ClearableFormItem
                                collectFormName={true}
                                form={form}
                                setFormValues={setFormValues}
                                label="Date result sent"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                // initialValue={resultsent_date ? moment(resultsent_date) : null}
                                name="dateResultSent"
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
                                  name="dateResultSent"
                                />
                              </ClearableFormItem>
                            </Col> */}
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
