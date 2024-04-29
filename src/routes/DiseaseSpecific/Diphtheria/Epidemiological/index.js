import { Col, Collapse, Input, Radio, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";

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
          <Col lg={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Vaccination status"
              name="vaccinationStatus"
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
                name="vaccinationStatus"
              >
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notVaccinated">
                  Not vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.vaccinationStatus === "vaccinated" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Number of diphtheria containing vaccine dose received"
                  name="numberofVaccineDoses"
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
                    <Radio.Button value="4+">4+</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of last vaccination:"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateOfLastVaccination"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfLastVaccination" />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Source of vaccination history"
                  name="sourceOfVaccinationHistory"
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
                    <Radio.Button value="card">Vaccine Card</Radio.Button>
                    <Radio.Button value="verbal">Verbal</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            </>
          )}

          {formValues?.vaccinationStatus &&
            formValues?.vaccinationStatus === "notVaccinated" && (
              <Col lg={24} md={24} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="If not vaccinated, indicate reason"
                  name="notVaccinated"
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
                    name="notVaccinated"
                  >
                    <Radio.Button value="religious exemption">
                      Religious Exemption
                    </Radio.Button>
                    <Radio.Button value="medical contraindication">
                      Medical Contraindication
                    </Radio.Button>
                    <Radio.Button value="under age">Under age</Radio.Button>
                    <Radio.Button value="parental refusal">
                      Parental Refusal
                    </Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                    <Radio.Button value="others">Others</Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>
            )}

          {formValues?.vaccinationStatus === "notVaccinated" &&
            formValues?.notVaccinated === "others" && (
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Other reasons not vaccinated?"
                  name="otherReasonNoVaccine"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    placeholder="Enter reason"
                    id="otherReasonNoVaccine"
                    name="otherReasonNoVaccine"
                    onChange={(e) =>
                      handleUpdateInputValues(e.target.name, e.target.value)
                    }
                  />
                </ClearableFormItem>
              </Col>
            )}

          <Col lg={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Did the patient travel during or after illness?"
              name="didThePatientTravelDuringOrAfterIllness"
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
                name="didThePatientTravelDuringOrAfterIllness"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.didThePatientTravelDuringOrAfterIllness === "YES" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                label="Travel address of patient during or after illness"
                name="clientAddress"
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
                  placeholder="If yes, enter address visited"
                  id="clientAddress"
                  name="clientAddress"
                />
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.patientHospitalizedOrVisitAnyoneInTheHospitalBeforeIllness ===
            "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Hospitalization status"
                  name="hospitalizationStatus"
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
                    <Radio.Button value="in-patient">In-patient</Radio.Button>
                    <Radio.Button value="out-patient">Out-patient</Radio.Button>
                    <Radio.Button value="visitingFriend">
                      Visiting Acquaintance
                    </Radio.Button>
                  </Radio.Group>
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of visit or hospitalization?"
                  name="dateHospitalVisit"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateHospitalVisit" />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Name of hospital"
                  name="nameOfHospital"
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
                    placeholder="Enter Hospital Name"
                    id="hospitalName"
                    name="hospitalName"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Address of hospital visited or hospitalized in?"
                  name="addressHospitalVisit"
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
                    placeholder="Enter place Address"
                    id="addressHospitalVisit"
                    name="addressHospitalVisit"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Was the patient admitted in the isolation ward?"
              name="wasThePatientAdmittedInTheIsolationWard"
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
                name="wasThePatientAdmittedInTheIsolationWard"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.wasThePatientAdmittedInTheIsolationWard === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Name of hospital"
                  name="nameOfHospitalPatientAdmittedInIsolation"
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
                    placeholder="Enter Hospital Name"
                    id="nameOfHospitalPatientAdmittedInIsolation"
                    name="nameOfHospitalPatientAdmittedInIsolation"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of admission?"
                  name="dateOfAdmissionPatientInIsolationWard"
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
                    name="dateOfAdmissionPatientInIsolationWard"
                  />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Date of discharge"
                  name="dateOfDischargePatientInIsolationWard"
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
                    name="dateOfDischargePatientInIsolationWard"
                  />
                </ClearableFormItem>
              </Col>

            </>
          )}

          <Col lg={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Did case visit a traditional healer in 3weeks before onset"
              name="locationTraditionalHealer"
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
                name="locationTraditionalHealer"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.locationTraditionalHealer === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Name of traditional healer"
                  name="nameTraditionalHealer"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}

                >
                  <Input
                    placeholder="Enter name of healer"
                    id="name"
                    name="name"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Address of traditional healer"
                  name="addressTraditionalHealer"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}

                >
                  <Input
                    placeholder="Enter address of healer"
                    id="address"
                    name="address"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Did the patient receive traditional medicine?"
              name="traditionalMedicine"
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
                name="traditionalMedicine"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.traditionalMedicine === "YES" && (
            <Col lg={12} sm={24}>
              <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                label="Traditional medicine type"
                name="traditionalMedicineType"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}

              >
                <Input
                  placeholder="Enter Medicine Type"
                  id="traditionalMedicineType"
                  name="traditionalMedicineType"
                  onChange={(e) => {}}
                />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={24} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Did case attend funeral ceremonies anytime in the 3 weeks before illness?"
              name="visitFuneralCeremonies"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
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
              form={form}
              setFormValues={setFormValues}
              label="Did the patient have contact with a known suspect / confirmed case anytime in the three weeks before becoming ill?"
              name="contactSuspectConfirmed"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
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
                name="contactSuspectConfirmed"
              />
            </ClearableFormItem>
          </Col>


          <Col lg={24} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Did the patient have contact with a wild animal (non-human primate or others)?"
              name="animalContact"
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
                name="animalContact"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.animalContact === "YES" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                label="Kind of animal"
                name="kindAnimal"
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
                  placeholder="Enter Animal Name"
                  id="kindAnimalName"
                  name="epidNumber"
                  onChange={(e) => {}}
                />
              </ClearableFormItem>
            </Col>
          )}
          <Col lg={24} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Is this case epidemiologically linked to another confirmed case/outbreak?"
              name="epidemiologicallyLinkedExposed"
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
                name="epidemiologicallyLinkedExposed"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  form={form}
                  setFormValues={setFormValues}
                  label="Outcome"
                  name="outcome"
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
                <Col lg={12} md={12} sm={24}>
                  <ClearableFormItem
                    form={form}
                    setFormValues={setFormValues}
                    label="Date of death"
                    name="dateOfPatientDeath"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                   
                  >
                    <CustomDatePicker form={form} name="dateOfPatientDeath" />
                  </ClearableFormItem>
                </Col>
              )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
