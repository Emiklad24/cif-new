/* eslint-disable no-unused-vars */
import { Checkbox, Col, Collapse, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";
import "styles/pages/form.less";

const CheckboxGroup = Checkbox.Group;

const ClinicalHistory = ({ form }) => {
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

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={12} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of symptom onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfSymptomOnset"
            >
              <CustomDatePicker form={form} name="dateOfSymptomOnset" />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Fever (>=38C)"
              name="fever"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Headache"
              name="headache"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Stiff neck"
              name="stiffneck"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Sore throat"
              name="SoreThroat"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Pharyngitis/Tonsilitis"
              name="pharyngitisTonsilitis"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Vomiting or Nausea"
              name="vomittingNausea"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Muscle pain"
              name="musclePain"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Confusion Or difficulty concentrating"
              name="confusionOfDiifconcentrating"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={24} md={24} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Clinical presentation"
              name="clinicalPresentation"
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
                <Radio.Button value="bacteriemias">Bacteriemias</Radio.Button>
                <Radio.Button value="meningitis">Meningitis</Radio.Button>
                <Radio.Button value="pneumonia">Pneumonia</Radio.Button>
                <Radio.Button value="septic arthritis">
                  Septic arthritis
                </Radio.Button>
                <Radio.Button value="sellulitis">Sellulitis</Radio.Button>
                <Radio.Button value="pericarditis">Pericarditis</Radio.Button>
                <Radio.Button value="osteomyelitis">Osteomyelitis</Radio.Button>
                <Radio.Button value="purpura fulminans">
                  Purpura fulminans
                </Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Other symptom please specify"
              name="othersymptoms"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="othersymptoms"
                id="othersymptoms "
                name="othersymptoms"
                type="text"
              />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
