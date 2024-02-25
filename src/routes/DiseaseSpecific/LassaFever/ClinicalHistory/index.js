/* eslint-disable no-unused-vars */
import { Col, Collapse, Input, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";
import "styles/pages/form.less";

const ClinicalHistory = ({ form }) => {
  const [formValues, setFormValues] = useState({});
  const { data: allLookup } = useFetchAllLookup();

  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of symptom onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              // initialValue={symptom_date ? moment(symptom_date) : null}
              name="dateOfSymptomOnset"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfSymptomOnset" />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Fever (≥38 °C)"
              name="fever"
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
              label="General weakness"
              name="generalWeakness"
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
              label="Malaise"
              name="malaise"
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
              name="soreThroat"
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
              label="Chest pain"
              name="chestPain"
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
              label="Vomitting or nausea"
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
              label="Cough"
              name="cough"
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
              label="Oral ulcer"
              name="oralUlcer"
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
              label="Abdominal cramps"
              name="abdominalCramps"
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
              label="Unexplained bleeding from any site"
              name="unexplainedBleeding"
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
              label="Other symptom(s) (specify)"
              name="otherSymptoms"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Enter other symptoms"
                id="otherSymptoms "
                name="otherSymptoms"
                type="Text"
              />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
