/* eslint-disable no-unused-vars */
import { Col, Input, Collapse, Row, Radio } from "antd";
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

  const { data: allLookup } = useFetchAllLookup();

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const allHealthFacilitiesQuery = useGetHealthFacilities();

  const nameOfTestingLaboratory = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
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
              <CustomDatePicker form={form} name="dateSampleSent" />
            </ClearableFormItem>
          </Col>
          <Row>
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
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
                  name="typeOfSpecimenReceived"
                />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={8} sm={24}>
              <ClearableFormItem
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
                <CustomDatePicker form={form} name="dateSpecimenReceived" />
              </ClearableFormItem>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                label="Laboratory ID"
                name="laboratoryId"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Enter specimen Id" onChange={(e) => {}} />
              </ClearableFormItem>
            </Col>
          </Row>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
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
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="adequate">Adequate</Radio.Button>
                <Radio.Button value="not adequate">Not adequate</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
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
                options={[{ label: "PCR", value: "PCR" }]}
                name="typeOfTestConducted"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
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
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="positive">Positive</Radio.Button>
                <Radio.Button value="negative">Negative</Radio.Button>
                <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                <Radio.Button value="pending">Pending</Radio.Button>
                <Radio.Button value="notdone">Not Done</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Date of result available"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateResultAvailable"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateResultAvailable" />
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={8} sm={24}>
            <ClearableFormItem
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
              <CustomDatePicker form={form} name="dateResultSent" />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
