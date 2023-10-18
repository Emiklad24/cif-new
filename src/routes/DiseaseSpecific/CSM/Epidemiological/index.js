import { Col, Input, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";

import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const Epidemiological = ({ form }) => {
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

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              label="Patient ever received any meningococaal vaccine?"
              name="patientEverReceivedAnyMeningococalVaccine"
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
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="patientEverReceivedAnyMeningococalVaccine"
              >
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notVaccinated">
                  Not Vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.patientEverReceivedAnyMeningococalVaccine ===
            "vaccinated" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label=" Date of vaccination"
                  name="dateOfVaccination"
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
                    name="dateOfVaccination"
                    onChange={(_, dateString) =>
                      handleUpdateInputValues("dateOfVaccination", dateString)
                    }
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Number of vaccine doses"
                  name="numberofVaccineDoses"
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
                    <Radio.Button value="1">1</Radio.Button>
                    <Radio.Button value="2">2</Radio.Button>
                    <Radio.Button value="3">3</Radio.Button>
                    <Radio.Button value="4">4</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Source of vaccination history"
                  name="sourceOfVaccinationHistory"
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
                    <Radio.Button value="card">Card</Radio.Button>
                    <Radio.Button value="verbal">Verbal</Radio.Button>
                    <Radio.Button value="no">No</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            </>
          )}

          {formValues?.vaccinationStatus === "notVaccinated" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="If not vaccinated, indicate reason"
                name="noVaccine"
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
                  <Radio.Button value="religious_exemption">
                    {" "}
                    Religious_Exemption
                  </Radio.Button>
                  <Radio.Button value="medical_contraindication">
                    Medical_Contraindication
                  </Radio.Button>
                  <Radio.Button value="under_age">Under_age</Radio.Button>
                  <Radio.Button value="parental_refusal">
                    Parental_Refusal
                  </Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              label="History of travel in the last 10 days "
              name="travelInLast10Days"
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
                name="travelInLast10Days"
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
          {formValues?.travelInLast10Days === "yes" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="If yes to above, where?"
                name="travelLocation"
                form={form}
                setFormValues={setFormValues}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Enter Address" id="addresstravel" />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              label="Have you had contact with anyone with similar symptoms/confirmed case in the last 10 days"
              name="contactWithAnyoneWithSymtomsOrConfirmed"
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
                name="contactWithAnyoneWithSymtomsOrConfirmed"
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
          {formValues?.contactWithAnyoneWithSymtomsOrConfirmed === "yes" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                label="Location of contact(s)"
                name="contactLocation"
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
                <Input
                  placeholder="Enter Contact Location"
                  id="contact"
                  name="contactLocation"
                  onChange={(e) => {}}
                />
              </ClearableFormItem>
            </Col>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
