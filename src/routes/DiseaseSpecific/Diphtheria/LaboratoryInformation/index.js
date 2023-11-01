import { Col, Input, Collapse, Row, Radio, Divider } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import useGetHealthFacilities from "../../../../hooks/useGetHealthFacilities.hook";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import DynamicSelect from "../../../../components/Custom/DynamicSelect";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

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
                      { label: "Blood", value: "blood" },
                      { label: "Skin biopsy", value: "skinBiopsy" },
                      { label: "Nasal swab", value: "nasal swab" },
                      {
                        label: "Nasopharyngeal swab",
                        value: "nasopharyngeal swab",
                      },
                      {
                        label: "Oral pharyngeal swab",
                        value: "oral pharyngeal swab",
                      },
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
              <Divider plain>Laboratory result</Divider>
              {formValues?.specimenType?.includes("blood") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    form={form}
                    setFormValues={setFormValues}
                    label="Blood specimen received"
                    name="bloodSampleReceived"
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
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedBlood"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedBlood"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdBlood"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
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

                  {formValues?.specimenConditionBlood === "not adequate" && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
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
                        form={form}
                        setFormValues={setFormValues}
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
                          options={[
                            { label: "PCR", value: "pcr" },
                            { label: "Serology", value: "serology" },
                          ]}
                          name="bloodTestConducted"
                          onChange={(value) =>
                            handleUpdateInputValues("bloodTestConducted", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.bloodTestConducted?.includes("pcr") && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="PCR result"
                          name="resultBloodPcr"
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
                        !["not done", "pending"].includes(
                          formValues?.resultBloodPcr
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released "
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedBloodPcr"
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                form={form}
                                name="dateResultReleasedBloodPcr"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </>
                  )}

                  {formValues?.bloodTestConducted?.includes("serology") && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Serology result"
                          name="resultBloodSerology"
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
                            name="resultBloodSerology"
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

                      {formValues?.resultBloodSerology &&
                        !["not done", "pending"].includes(
                          formValues?.resultBloodSerology
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedBloodSerology"
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
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

              <Divider plain></Divider>
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
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="skinBiopsySampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
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
                        buttonStyle="solid"
                        name="specimenConditionSkinBiopsy"
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
                          options={[
                            { label: "PCR", value: "pcr" },
                            { label: "Serology", value: "serology" },
                          ]}
                          name="testConductedSkinBiopsy"
                          onChange={(value) =>
                            handleUpdateInputValues(
                              "testConductedSkinBiopsy",
                              value
                            )
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedSkinBiopsy?.includes("pcr") && (
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
                            <Radio.Button value="pending">Pending</Radio.Button>
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
                                form={form}
                                name="dateResultReleasedSkinBiopsyPcr"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </>
                  )}

                  {formValues?.testConductedSkinBiopsy?.includes(
                    "serology"
                  ) && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Serology result"
                          name="resultSkinBiopsySerology"
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
                            name="resultSkinBiopsySerology"
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

                      {formValues?.resultSkinBiopsySerology &&
                        !["not done", "pending"].includes(
                          formValues?.resultSkinBiopsySerology
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedSkinBiopsySerology"
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                form={form}
                                name="dateResultReleasedSkinBiopsySerology"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </>
                  )}
                </>
              )}
              <Divider plain></Divider>

              {formValues?.specimenType?.includes("nasal swab") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    form={form}
                    setFormValues={setFormValues}
                    label="Nasal swab specimen received"
                    name="nasalSwabSampleReceived"
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
                      name="nasalSwabSampleReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}
              {formValues?.nasalSwabSampleReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Date specimen received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSpecimenReceivedNasalSwab"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenReceivedNasalSwab"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Laboratory ID"
                      name="laboratoryIdNasalSwab"
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
                        id="laboratoryIdNasalSwab"
                        name="laboratoryIdNasalSwab"
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
                      name="specimenConditionNasalSwab"
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
                        name="specimenConditionNasalSwab"
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

                  {formValues?.specimenConditionNasalSwab ===
                    "not adequate" && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Reason why specimen is not adequate"
                        name="reasonSampleConditionNasalSwab"
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
                          id="reasonSampleConditionNasalSwab"
                          name="reasonSampleConditionNasalSwab"
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
                          options={[
                            { label: "PCR", value: "pcr" },
                            { label: "Serology", value: "serology" },
                            { label: "Culture", value: "culture" },
                            { label: "ELEK", value: "ELEK" },
                          ]}
                          name="testConductedSwab"
                          onChange={(value) =>
                            handleUpdateInputValues("testConductedSwab", value)
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
                            <Radio.Button value="pending">Pending</Radio.Button>
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
                          <Col lg={12} md={12} sm={24}>
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
                                form={form}
                                name="dateResultReleasedSwabPcr"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </>
                  )}

                  {formValues?.testConductedSwab?.includes("serology") && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Serology result"
                          name="resultNasalSwabSerology"
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
                            name="resultNasalSwabSerology"
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

                      {formValues?.resultNasalSwabSerology &&
                        !["not done", "pending"].includes(
                          formValues?.resultNasalSwabSerology
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedSwabSerology"
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                form={form}
                                name="dateResultReleasedSwabSerology"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </>
                  )}
                  {formValues?.testConductedSwab?.includes("culture") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Culture result"
                          name="resultNasalSwabCulture"
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
                            name="resultNasalSwabCulture"
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

                      {formValues?.resultNasalSwabCulture === "growth" && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            form={form}
                            setFormValues={setFormValues}
                            label="Specify type of bacteria"
                            name="specifyBacteriaNasalSwabCulture"
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
                              name="specifyBacteriaNasalSwabCulture"
                              placeholder="specify"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Date result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedNasalSwabSerology"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedNasalSwabSerology"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSwab?.includes("ELEK") && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="ELEK result"
                          name="resultNasalSwabElek"
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
                            name="resultNasalSwabElek"
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

                      {formValues?.resultNasalSwabElek &&
                        !["not done", "pending"].includes(
                          formValues?.resultNasalSwabElek
                        ) && (
                          <Col lg={12} md={12} sm={24}>
                            <ClearableFormItem
                              collectFormName={true}
                              form={form}
                              setFormValues={setFormValues}
                              label="Date result released"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              name="dateResultReleasedSwabSerology"
                              rules={[
                                {
                                  required: true,
                                  message: "This field is required",
                                },
                              ]}
                            >
                              <CustomDatePicker
                                form={form}
                                name="dateResultReleasedSwabSerology"
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
