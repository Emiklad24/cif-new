import { Checkbox, Col, Collapse, Divider, Input, Radio, Row } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";

const CheckboxGroup = Checkbox.Group;

const ClinicalHistory = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));
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
              label="Date of symptom onset"
              name="dateOfSymptomOnset"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select a date!",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfSymptomOnset" />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              label="Fever (≥38 °C)"
              name="fever"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
                name="fever"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.fever === "yes" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  label="Date of fever onset"
                  name="dateOfFeverOnset"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={feveronset_date ? moment(feveronset_date) : null}
                  rules={[
                    {
                      required: true,
                      message: "Select a date!",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfFeverOnset" />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              label="Present of lesions?"
              name="presentOfLesion"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
                name="presentOfLesion"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.presentOfLesion === "YES" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  label="Are the lesions in the same state of development on the body?"
                  name="lesionSameStateOnTheBody"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Select an option!",
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
                    name="lesionSameStateOnTheBody"
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  label="Are all of the lesions the same size?"
                  name="leslesionSameSize"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Select an option!",
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
                  label="Are the lesions deep and profound?"
                  name="lesionDeepAndProfound"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Select an option!",
                    },
                  ]}
                >
                  <DynamicRadio
                    buttonStyle="solid"
                    options={allLookup?.yes_no_unknown || []}
                    valueProperty="id"
                    labelProperty="value"
                    name="lesionDeepAndProfound"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          {formValues?.presentOfLesion === "YES" && (
            <Col lg={24} md={24} sm={24}>
              <ClearableFormItem
                label="Localisation of the lesions?"
                name="localisationOfLesions"
                form={form}
                setFormValues={setFormValues}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={[
                    { label: "Face", value: "face" },
                    { label: "Leg", value: "leg" },
                    { label: "Soles of the Feet", value: "soles of the feet" },
                    {
                      label: "Palms of the Hands",
                      value: "palms of the hands",
                    },
                    { label: "Thorax", value: "thorax" },
                    { label: "Arms", value: "arms" },
                    { label: "Genitals", value: "genitals" },
                    { label: "All over the Body", value: "All over the body" },
                  ]}
                  name="localisationOfLesions"
                />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              label="Red eyes (Conjunctivities)"
              name="redEyes"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Sensitivity to light"
              name="sensitivityToLight"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Vomitting or Nausea"
              name="vomittingNausea"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an Option!",
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
              label="Cough"
              name="cough"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Oral ulcer"
              name="oralUlcer"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Swollen Lymph Nodes"
              name="lymphadenopathy"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Sore throat"
              name="soreThroat"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Muscle pain"
              name="musclePain"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Headache"
              name="headache"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Chills or Sweats"
              name="chillsOrSweats"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Fatigue"
              name="fatigue"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Pruritus"
              name="pruritus"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Skin ulcer"
              name="skinUlcer"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
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
              label="Other symptoms(s): (specify)"
              name="otherSymptom"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input placeholder="Enter other symptoms" onChange={(e) => {}} />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              label="Outcome"
              name="outcome"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.present_condition_type || []}
                valueProperty="id"
                labelProperty="value"
                name="outcome"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.outcome === "DEAD" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Date of death"
                  name="dateOfDeath"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <CustomDatePicker form={form} name="dateOfDeath" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  label="Place of death"
                  name="placeOfDeath"
                  setFormValues={setFormValues}
                  form={form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input id="placeOfDeath" placeholder="Place of death" />
                </ClearableFormItem>
              </Col>
            </>
          )}
          <Divider plain>Co-morbidity</Divider>

          <Col lg={24} md={24} sm={24}>
            <ClearableFormItem
              label="Have you been tested for HIV before/within this year"
              name="haveTestedForHiv"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={[
                  {
                    id: "NOT_PREVIOUSLY_TESTED",
                    value: "Not previously tested",
                  },
                  {
                    id: "PREVIOUSLY_TESTED",
                    value: "Previously tested",
                  },
                  {
                    id: "NEGATIVE_PREVIOUSLY_TESTED",
                    value: "Negative previously tested",
                  },
                  {
                    id: "POSITIVE_IN_HIV_CARE",
                    value: "Positive in HIV care",
                  },
                  {
                    id: "PREVIOUSLY_TESTED_POSITIVE_NOT_IN_HIV_CARE",
                    value: "Previoulsy tested positive not in HIV care",
                  },
                  {
                    id: "UNKNOWN",
                    value: "Unknown",
                  },
                ]}
                valueProperty="id"
                labelProperty="value"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              label="Do you consent to be tested"
              name="doYouConsentToBeTested"
              setFormValues={setFormValues}
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_type || []}
                valueProperty="id"
                labelProperty="value"
                name="doYouConsentToBeTested"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.doYouConsentToBeTested === "YES" && (
            <Col lg={8} md={8} sm={24}>
              <ClearableFormItem
                label="HIV RTK test result"
                name="hivRtkTestResult"
                setFormValues={setFormValues}
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <DynamicRadio
                  buttonStyle="solid"
                  options={[
                    {
                      id: "POSITIVE",
                      value: "Positive",
                    },
                    {
                      id: "NEGATIVE",
                      value: "Negative",
                    },
                    {
                      id: "INCONCLUSIVE",
                      value: "Inconclusive",
                    },
                    {
                      id: "NOT_DONE",
                      value: "Not done",
                    },
                  ]}
                  valueProperty="id"
                  labelProperty="value"
                  name="hivRtkTestResult"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                />
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.hivRtkTestResult === "POSITIVE" && (
            <Col lg={8} md={8} sm={24}>
              <ClearableFormItem
                label="Referred for Antiretroviral therapy (ART)"
                name="referredForArt"
                setFormValues={setFormValues}
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <DynamicRadio
                  buttonStyle="solid"
                  options={allLookup?.yes_no_type || []}
                  valueProperty="id"
                  labelProperty="value"
                  name="referredForArt"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                />
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.referredForArt === "YES" && (
            <Col lg={8} md={8} sm={24}>
              <ClearableFormItem
                label="Name of Hospital/Health facility"
                name="nameOfHospitalReferredForArt"
                setFormValues={setFormValues}
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  id="nameOfHospitalReferredForArt"
                  placeholder="Name of Hospital/Health facility"
                />
              </ClearableFormItem>
            </Col>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
