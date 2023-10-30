import { Col, Input, Collapse, Row, Divider, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import useGetHealthFacilities from "../../../../hooks/useGetHealthFacilities.hook";
import DynamicSelect from "../../../../components/Custom/DynamicSelect";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});
  const { data: allLookup } = useFetchAllLookup();
  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const nameOfTestingLaboratory = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );
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
              setFormValues={setFormValues}
              form={form}
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
                labelProperty="value"
                valueProperty="id"
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
                  label="Date specimen collected "
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={birth_date ? moment(birth_date) : undefined}
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
                  setFormValues={setFormValues}
                  form={form}
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
                      { label: "Nasal swab", value: "nasalSwab" },
                      { label: "Throat swab", value: "throatSwab" },
                      { label: "Nasopharyngeal", value: "nasopharyngeal" },
                      { label: "Oropharyngeal", value: "oropharyngeal" },
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
                    setFormValues={setFormValues}
                    form={form}
                    label="Date specimen sent"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={birth_date ? moment(birth_date) : undefined}
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

              {formValues?.specimenType?.includes("nasalSwab") && (
                <Col lg={8} md={8} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    setFormValues={setFormValues}
                    form={form}
                    label="Nasal swab received?"
                    name="nSwabSpecimenReceived"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "This field is required ",
                      },
                    ]}
                  >
                    <DynamicRadio
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      labelProperty="value"
                      valueProperty="id"
                      name="nSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
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
                    label="Throat swab received?"
                    name="tSwabSpecimenReceived"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "This field is required ",
                      },
                    ]}
                  >
                    <DynamicRadio
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      labelProperty="value"
                      valueProperty="id"
                      name="tSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
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
                    label="Nasopharyngeal swab received?"
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
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      labelProperty="value"
                      valueProperty="id"
                      name="npSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.specimenType?.includes("oropharyngeal") && (
                <Col lg={8} md={8} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    setFormValues={setFormValues}
                    form={form}
                    label="Oropharyngeal swab received?"
                    name="opSwabSpecimenReceived"
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
                      labelProperty="value"
                      valueProperty="id"
                      name="opSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {(formValues?.nSwabSpecimenReceived === "YES" ||
                formValues?.tSwabSpecimenReceived === "YES" ||
                formValues?.opSwabSpecimenReceived === "YES" ||
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
                      name="dateSecimenReceivedNasalThroatNp"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSecimenReceivedNasalThroatNp"
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
                      <Input placeholder="Enter Lab ID" />
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
                        buttonStyle="solid"
                        name="specimenConditionNasalThroatNp"
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

                  {formValues?.specimenConditionNasalThroatNp &&
                    formValues?.specimenConditionNasalThroatNp ===
                      "not adequate" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          form={form}
                          setFormValues={setFormValues}
                          label="Reason why specimen is not adequate"
                          name="reasonSampleConditionNasalThroatNp"
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
                            id="reasonSampleConditionNasalThroatNp"
                            name="reasonSampleConditionNasalThroatNp"
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
                          options={
                            formValues?.specimenType?.length === 1 &&
                            formValues?.specimenType[0] === "nSwab"
                              ? [
                                  { label: "PCR", value: "pcr" },
                                  { label: "serology", value: "serology" },
                                ]
                              : [
                                  { label: "PCR", value: "pcr" },
                                  { label: "RDT", value: "rdt" },
                                ]
                          }
                          name="testConductedNasal"
                          onChange={(value) =>
                            handleUpdateInputValues("testConductedNasal", value)
                          }
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedNasal?.includes("pcr") && (
                    <Row>
                      <Divider />
                      <Col lg={20} md={20} sm={24}>
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="not done">
                              Not Done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {(formValues?.pcrResultNasalThroatNp === "positive" ||
                        formValues?.pcrResultNasalThroatNp ===
                          "indeterminate" ||
                        formValues?.pcrResultNasalThroatNp === "negative") && (
                        <Col lg={8} md={8} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Date result released"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="dateResultSentPCR"
                          >
                            <CustomDatePicker
                              form={form}
                              name="dateResultSentPCR"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}
                      <Divider />
                    </Row>
                  )}

                  {formValues?.testConductedNasal?.includes("rdt") && (
                    <Row>
                      <Col lg={20} md={20} sm={24}>
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
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="not done">
                              Not Done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      {(formValues?.rdtResultNasalThroatNp === "positive" ||
                        formValues?.rdtResultNasalThroatNp ===
                          "indeterminate" ||
                        formValues?.rdtResultNasalThroatNp === "negative") && (
                        <Col lg={8} md={8} sm={24}>
                          <ClearableFormItem
                            collectFormName={true}
                            setFormValues={setFormValues}
                            form={form}
                            label="Date result released"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            name="dateResultSentOutNasal"
                          >
                            <CustomDatePicker
                              form={form}
                              name="dateResultSentOutNasal"
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
