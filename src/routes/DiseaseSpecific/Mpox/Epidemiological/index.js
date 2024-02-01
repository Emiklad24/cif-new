import { Checkbox, Col, Collapse, Input, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";
import "styles/pages/form.less";

const CheckboxGroup = Checkbox.Group;

const Epidemiological = ({ form }) => {
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
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Travelled within the last 3 weeks before becoming ill?"
              name="travelledWithinLastThreeweeks"
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
                name="travelledWithinLastThreeweeks"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.travelledWithinLastThreeweeks === "YES" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Name of village patient fell ill"
                name="nameOfVillagePatientFellIll"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Name of the village the patient fell ill"
                  id="nameOfVillagePatientFellIll"
                  name="nameOfVillagePatientFellIll"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Does the patient have a cutaneous eruption (Rash)?"
              name="patientHaveCutaneousEruption"
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
                name="patientHaveCutaneousEruption"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.patientHaveCutaneousEruption === "YES" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Date of onset of rash"
                name="dateOnsetOfRash"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CustomDatePicker name="dateOnsetOfRash" form={form} />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={24} md={24} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="During onset of symptoms, did the patient have contact with one or more persons who had with similar symptoms?"
              name="patientContactWithPersonSimilarSymptoms"
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
              label="Did the patient touch a domestic or wild animal during the three weeks preceding symptom onset?"
              name="patientTouchAnimals"
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
                name="patientTouchAnimals"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.patientTouchAnimals === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="What kind of animal?"
                  name="kindOfAnimal"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter type of animal touched"
                    id="kindofanimal"
                    name="kindOfAnimal"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date of animal contact"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={symptom_date ? moment(symptom_date) : null}
                  name="dateOfAnimalContact"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfAnimalContact" />
                </ClearableFormItem>
              </Col>

              <Col lg={24} md={24} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Type of contact?"
                  name="typeOfContact"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <CheckboxGroup
                    options={[
                      {
                        label: "Rodents alive in the House",
                        value: "rodents_alive_in_the_house",
                      },
                      {
                        label: "Dead animal found in the forest",
                        value: "dead_animal_found_in_the_forest",
                      },
                      {
                        label: "Alive animal living in the forest",
                        value: "alive_animal_living_in_the_forest",
                      },
                      {
                        label: "Animal bought for meat",
                        value: "animal_bought_for_meat",
                      },
                    ]}
                    name="typeOfContact"
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Is a smallpox vaccination scar present?"
              name="smallpoxVaccineScarPresent"
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
export default Epidemiological;
