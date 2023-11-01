import { Col, Collapse, Row, Divider, Radio, Input } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";
import useGetHealthFacilities from "../../../../hooks/useGetHealthFacilities.hook";
import DynamicSelect from "../../../../components/Custom/DynamicSelect";

const CheckboxGroup = Checkbox.Group;

const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const customDividerStyle = {
    "&.ant-divider-inner-text": {
      border: "4px solid #000",
    },
  };

  const [formValues, setFormValues] = useState({});
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
                      { label: "Rectal swab", value: "rectal swab" },
                    ]}
                    name="specimenType"
                    onChange={(value) => {
                      handleUpdateInputValues("specimenType", value);
                    }}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={24} sm={24}>
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

              <Col lg={8} md={24} sm={24}>
                <ClearableFormItem
                 collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="Date specimen was sent"
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

              <Divider className={customDividerStyle}>
                Laboratory Result
              </Divider>
              <Col lg={8} md={24} sm={24}>
                <ClearableFormItem
                 collectFormName={true}
                  form={form}
                  setFormValues={setFormValues}
                  label="RDT result conducted"
                  name="rdtTestConducted"
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
                    name="rdtTestConducted"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>

              {formValues?.rdtTestConducted === "YES" && (
                <Col lg={8} md={24} sm={24}>
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
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="positive">Positive</Radio.Button>
                      <Radio.Button value="negative">Negative</Radio.Button>
                      <Radio.Button value="invalid">Invalid</Radio.Button>
                    </Radio.Group>
                  </ClearableFormItem>
                </Col>
              )}

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
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="stoolSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.stoolSwabSpecimenReceived === "YES" && (
                <Row>
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
                        buttonStyle="solid"
                        name="specimenConditionStool"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="adequate">Adequate</Radio.Button>
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
                        options={[
                          { label: "Microscopy", value: "microscopy" },
                          { label: "Culture", value: "culture" },
                        ]}
                        name="typeOfTestDoneStool"
                        onChange={(value) =>
                          handleUpdateInputValues("typeOfTestDoneStool", value)
                        }
                      />
                    </ClearableFormItem>
                  </Col>

                  {formValues?.typeOfTestDoneStool?.includes("microscopy") && (
                    <Col lg={12} md={24} sm={24}>
                      <ClearableFormItem
                       collectFormName={true}
                        form={form}
                        setFormValues={setFormValues}
                        label="Microscopy test result"
                        name="testResultStoolMicroscopy"
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
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.typeOfTestDoneStool?.includes("culture") && (
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
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
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
                      name="dateSpecimenTestedStool"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSpecimenTestedStool"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={24} sm={24}>
                    <ClearableFormItem
                     collectFormName={true}
                      form={form}
                      setFormValues={setFormValues}
                      label="Test result"
                      name="testResultStool"
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
                        name="testResultStool"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="positive">Positive</Radio.Button>
                        <Radio.Button value="negative">Negative</Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.testResultStool &&
                    !["pending", "not done"].includes(
                      formValues?.testResultStool
                    ) && (
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
                            form={form}
                            name="dateResultReleasedStool"
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                  <Divider />
                </Row>
              )}

              {formValues?.specimenType?.includes("rectal swab") && (
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
                      buttonStyle="solid"
                      options={allLookup?.yes_no_type || []}
                      valueProperty="id"
                      labelProperty="value"
                      name="rectalSwabSpecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
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
                        buttonStyle="solid"
                        name="specimenConditionRectalSwab"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="adequate">Adequate</Radio.Button>
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
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
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
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
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
                        buttonStyle="solid"
                        name="testResultRectalSwab"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      >
                        <Radio.Button value="positive">Positive</Radio.Button>
                        <Radio.Button value="negative">Negative</Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.testResultRectalSwab &&
                    !["pending", "not done"].includes(
                      formValues?.testResultRectalSwab
                    )  && (
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
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
