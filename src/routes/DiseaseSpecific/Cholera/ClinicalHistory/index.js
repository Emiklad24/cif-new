import { Col, Input, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
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

  return (
    
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                <Radio.Group
                  buttonStyle="solid"
                  name="patientAdmittedAtLeastOneNight"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>

            {formValues?.patientAdmittedAtLeastOneNight === "yes" && (
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
                    rules={[
                      {
                        required: true,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <CustomDatePicker
                      form={form}
                      name="datePatientDischargedAtLeastOneNight"
                    />
                  </ClearableFormItem>
                </Col>
              </>
            )}
          </Row>
        </Panel>
      </Collapse>
    
  );
};
export default ClinicalHistory;
