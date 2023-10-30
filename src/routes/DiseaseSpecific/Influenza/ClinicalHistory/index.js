import { Col, Input, Collapse, Row } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const ClinicalHistory = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
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
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Fever"
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
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="fever"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.fever === "YES" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of fever onset"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateFeverOnset"
                  rules={[
                    {
                      required: true,
                      message: "Select a date!",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateFeverOnset" />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Cough?"
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
              form={form}
              setFormValues={setFormValues}
              label="Difficulty breathing?"
              name="difficultyBreathing"
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
              form={form}
              setFormValues={setFormValues}
              label="Chest indrawing?"
              name="chestIndrawing"
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
              form={form}
              setFormValues={setFormValues}
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
              form={form}
              setFormValues={setFormValues}
              label="Sore throat?"
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
              form={form}
              setFormValues={setFormValues}
              label="Vomiting or nausea?"
              name="vomitingNausea"
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
              form={form}
              setFormValues={setFormValues}
              label="Diarrhea"
              name="diarrhea"
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

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Others: (specify)"
              name="otherSpecify"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Enter other symptoms" onChange={(e) => {}} />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Date of symptom onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfOnset"
              rules={[
                {
                  required: true,
                  message: "Select a date!",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfOnset" />
            </ClearableFormItem>
          </Col>
        </Row>
        <Row>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Patient vaccinated against the flu?"
              name="patient_vaccine_flu"
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
              form={form}
              setFormValues={setFormValues}
              label="Currently taking antiviral medicine?"
              name="patient_take_antiviral"
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
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
