/* eslint-disable no-unused-vars */
import { Col, Collapse, Input, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";
import "styles/pages/form.less";

const ClinicalHistory = ({ form }) => {
  const { Panel } = Collapse;

  const [formValues, setFormValues] = useState({});
  const { data: allLookup } = useFetchAllLookup();

  const onChange = (value) => {
    
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Fever (≥38 °C) or history of fever"
              name="fever"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Sore throat"
              name="soreThroat"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Shortness of breath"
              name="shortBreath"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
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
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Vomiting"
              name="vomit"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Tiredness"
              name="tired"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Dehydration"
              name="dehydrated"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Nausea"
              name="nausea"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Chest pains"
              name="chestPains"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Diarrhea"
              name="diarrhea"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Loss of sense of smell"
              name="lossSmell"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Loss of sense of taste"
              name="lossTaste"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label=" Red Eyes"
              name="redEyes"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <DynamicRadio
                options={allLookup?.yes_no_unknown || []}
                labelProperty="value"
                valueProperty="id"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Other symptom (please specify)"
              name="OtherSymptoms"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Other Symptoms"
                id="otherSymptoms "
                name="otherSymptoms"
                type="text"
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of symptom onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select a date",
                },
              ]}
              name="dateOfSymptomOnsetClinicalHistory"
            >
              <CustomDatePicker
                form={form}
                name="dateOfSymptomOnsetClinicalHistory"
              />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
