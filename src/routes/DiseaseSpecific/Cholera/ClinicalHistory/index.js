import { Col, Input, Collapse, Row } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";

const ClinicalHistory = ({ form }) => {
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

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
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

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Myalgia"
              name="myalgia"
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
              label="Restlessness"
              name="restlessness"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Abdominal cramp"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="abdominalCramp"
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
              label="Vomiting"
              name="vomiting"
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
              label="Thirst"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="thirst"
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
              label="Dehydration"
              name="dehydrated"
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
              label="Blood in stool"
              name="bloodInStool"
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
              label="Other symptom, please specify"
              name="otherSymptoms"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Other symptoms"
                id="otherSymptoms "
                name="otherSymptoms"
                type="text"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={18} md={18} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Was the patient admitted to a health facility for at least one night?"
              name="patientAdmittedAtLeastOneNight"
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
                name="patientAdmittedAtLeastOneNight"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.patientAdmittedAtLeastOneNight === "YES" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of admission"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="datePatientAdmittedAtLeastOneNight"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker
                    form={form}
                    name="datePatientAdmittedAtLeastOneNight"
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of discharge"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="datePatientDischargedAtLeastOneNight"
                 
                >
                  <CustomDatePicker
                    form={form}
                    name="datePatientDischargedAtLeastOneNight"
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Date of symptom onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
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
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
