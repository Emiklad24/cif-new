import { Col, Collapse, Row, Divider, Radio } from "antd";
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

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };
  const { data: allLookup } = useFetchAllLookup();
  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const testingLaboratoryData = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              collectFormName={true}
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
                  label="Date specimen collected "
                  name="dateSpecimenCollected"
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
                  <CustomDatePicker form={form} name="dateSpecimenCollected" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  collectFormName={true}
                  label="Type of specimen collected?"
                  name="specimenType"
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
                  <CheckboxGroup
                    options={[
                      {
                        label: "Blood",
                        value: "blood",
                      },
                      { label: "Serum", value: "serum" },
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
                    label="Date specimen sent"
                    name="dateSpecimenSent"
                    setFormValues={setFormValues}
                    form={form}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <CustomDatePicker form={form} name="dateSpecimenSent" />
                  </ClearableFormItem>
                </Col>
              )}

              <Col lg={24} md={12} sm={12} xs={24}>
                <ClearableFormItem
                  collectFormName={true}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
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
                    collectFormName={true}
                    label="Blood specimen received"
                    name="bloodspecimenReceived"
                    setFormValues={setFormValues}
                    form={form}
                    onChange={(e) => {
                      handleUpdateInputValues(e.target.name, e.target.value);
                    }}
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
                      name="bloodspecimenReceived"
                      onChange={(e) =>
                        handleUpdateInputValues(e.target.name, e.target.value)
                      }
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.bloodspecimenReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      setFormValues={setFormValues}
                      form={form}
                      label="Date blood specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateBloodSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateBloodSpecimenReceived"
                      />
                    </ClearableFormItem>
                  </Col>

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
                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="adequate">Adequate</Radio.Button>
                        <Radio.Button value="not adequate">
                          Not adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={24} md={24} sm={24}>
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
                          options={[
                            { label: "Igm", value: "igm" },
                            { label: "IgG(acute)", value: "iggAcute" },
                            {
                              label: "IgG(convalescent)",
                              value: "iggConvalescent",
                            },
                            { label: "Microscopy", value: "microscopy" },
                            { label: "PRNT", value: "prnt" },
                            { label: "PCR/RT-PCR", value: "pcrRtPcr" },
                          ]}
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

                  {formValues?.testConductedBlood?.includes("igm") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Igm result for blood specimen"
                          name="igmResultBlood"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBloodIgm"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodIgm"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("iggAcute") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(Acute) result for blood specimen"
                          name="iggAcuteResultBlood"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBloodIggA"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodIggA"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes(
                    "iggConvalescent"
                  ) && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(Convalescent) result for blood specimen"
                          name="iggConvalescentResultBlood"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBloodIggc"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodIggc"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("microscopy") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Microscopy result for blood"
                          name="microscopyResultBlood"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBloodMicroscopy"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodMicroscopy"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("pcrRtPcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="PCR/RT-PCR result for blood"
                          name="pcrRtPcrResultBlood"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released"
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
                    </Row>
                  )}

                  {formValues?.testConductedBlood?.includes("prnt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="PRNT result for blood specimen"
                          name="prntResultBlood"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedBloodPrnt"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedBloodPrnt"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}
                </>
              )}

              {formValues?.specimenType?.includes("serum") && (
                <Col lg={24} md={24} sm={24}>
                  <ClearableFormItem
                    collectFormName={true}
                    setFormValues={setFormValues}
                    form={form}
                    label="Serum specimen received"
                    name="serumSpecimenReceived"
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
                      name="serumSpecimenReceived"
                      onChange={(e) => {
                        handleUpdateInputValues(e.target.name, e.target.value);
                      }}
                    />
                  </ClearableFormItem>
                </Col>
              )}

              {formValues?.serumSpecimenReceived === "YES" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      setFormValues={setFormValues}
                      form={form}
                      label="Date specimen received "
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="dateSeraSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <CustomDatePicker
                        form={form}
                        name="dateSeraSpecimenReceived"
                      />
                    </ClearableFormItem>
                  </Col>

                  <Col lg={12} md={12} sm={24}>
                    <ClearableFormItem
                      collectFormName={true}
                      setFormValues={setFormValues}
                      form={form}
                      label="Specimen condition"
                      name="specimenConditionSera"
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
                        <Radio.Button value="adequate">Adequate</Radio.Button>
                        <Radio.Button value="not adequate">
                          Not Adequate
                        </Radio.Button>
                      </Radio.Group>
                    </ClearableFormItem>
                  </Col>

                  {formValues?.specimenType?.length >= 1 && (
                    <Col lg={24} md={24} sm={24}>
                      <ClearableFormItem
                        collectFormName={true}
                        setFormValues={setFormValues}
                        form={form}
                        label="Test conducted"
                        name="testConductedSera"
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
                            { label: "Igm", value: "igm" },
                            { label: "IgG(acute)", value: "iggAcute" },
                            {
                              label: "IgG(convalescent)",
                              value: "iggConvalescent",
                            },
                            { label: "Microscopy", value: "microscopy" },
                            { label: "PRNT", value: "prnt" },
                            { label: "PCR/RT-PCR", value: "pcrRtPcr" },
                          ]}
                          name="testConductedSera"
                          onChange={(value) => {
                            handleUpdateInputValues("testConductedSera", value);
                          }}
                        />
                      </ClearableFormItem>
                    </Col>
                  )}

                  {formValues?.testConductedSera?.includes("igm") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Igm result for serum specimen"
                          name="igmResultSera"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSeraIgm"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSeraIgm"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("iggAcute") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(Acute) result for serum specimen"
                          name="iggAcuteResultSera"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSeraIgga"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSeraIgga"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes(
                    "iggConvalescent"
                  ) && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="IgG(convalescent) result for serum specimen"
                          name="iggConvalescentResultSera"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSeraIggc"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSeraIggc"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("microscopy") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Microscopy result for serum"
                          name="microscopyResultSera"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSeraMicroscopy"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSeraMicroscopy"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("pcrRtPcr") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="PCR/RT-PCR result for serum"
                          name="pcrRtPcrResultSera"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSeraPcr"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSeraPcr"
                          />
                        </ClearableFormItem>
                      </Col>
                    </Row>
                  )}

                  {formValues?.testConductedSera?.includes("prnt") && (
                    <Row>
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="PRNT result for serum specimen"
                          name="prntResultSera"
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
                            <Radio.Button value="inconclusive">
                              Inconclusive
                            </Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="notDone">
                              Not done
                            </Radio.Button>
                          </Radio.Group>
                        </ClearableFormItem>
                      </Col>

                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          collectFormName={true}
                          setFormValues={setFormValues}
                          form={form}
                          label="Date result released "
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          name="dateResultReleasedSeraPrnt"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <CustomDatePicker
                            form={form}
                            name="dateResultReleasedSeraPrnt"
                          />
                        </ClearableFormItem>
                      </Col>
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
