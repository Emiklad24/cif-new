import { Col, Input, Collapse, Row, Radio, Divider } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import DynamicSelect from "../../../../components/Custom/DynamicSelect";
import useGetHealthFacilities from "../../../../hooks/useGetHealthFacilities.hook";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

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
                        form={form}
                        name="dateSpecimenReceivedBlood"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      label="Laboratory ID"
                      name="laboratoryIdBlood"
                      form={form}
                      setFormValues={setFormValues}
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
                          options={[
                            { label: "PCR", value: "pcr" },
                            { label: "RDT", value: "rdt" },
                            { label: "Culture", value: "culture" },
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
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
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
                                form={form}
                                name="dateResultReleasedBloodPcr"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("rdt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
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
                                form={form}
                                name="dateResultReleasedBloodRdt"
                              />
                            </ClearableFormItem>
                          </Col>
                        )}
                    </Row>
                  )}

                  {formValues?.bloodTestConducted?.includes("culture") && (
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
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
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
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
                            form={form}
                            name="dateResultReleasedBloodCulture"
                          />
                        </ClearableFormItem>
                      </Col>
                    </>
                  )}
                </>
              )}
              <Divider plain></Divider>
              {formValues?.specimenType?.includes("cerebrospinalFluid") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
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
                        form={form}
                        name="dateSpecimenReceivedCsf"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      label="Laboratory ID"
                      name="laboratoryIdCsf"
                      form={form}
                      setFormValues={setFormValues}
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
                          <Radio.Group buttonStyle="solid">
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
                          <Radio.Group buttonStyle="solid">
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
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          label="Date result released"
                          name="dateResultReleasedCsfCultre"
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
                            form={form}
                            name="dateResultReleasedCsfCultre"
                          />
                        </ClearableFormItem>
                      </Col>
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
