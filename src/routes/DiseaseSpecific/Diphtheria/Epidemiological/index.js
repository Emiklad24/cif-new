import {
  Col,
  Form,
  Input,
  Collapse,
  DatePicker,
  Row,
  Tooltip,
  Select,
  Radio,
} from "antd";
import React, { useState } from "react";
// import "styles/pages/form.less";
import moment from "moment";

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const diseaseData = ["COVID-19", "Cholera", "Yellow Fever"];
const lgaData = {
  FCT: ["AMAC", "Bwari", "Kwali"],
  Enugu: ["Nsukka", "Enugu south", "Udi"],
};

const Epidemiological = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {
    console.log(inputName, value);

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  console.log("form values", formValues);

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Vaccination Status"
                name="vaccinationStatus"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Complete this field!",
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
              </Form.Item>
            </Col>

            {formValues?.vaccinationStatus === "vaccinated" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Number of diphtheria containing vaccine dose received:"
                    name="numberOfDiphtheriaContainingVaccine"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please choose one, compulsory!",
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="1">1</Radio.Button>
                      <Radio.Button value="2">2</Radio.Button>
                      <Radio.Button value="3">3</Radio.Button>
                      <Radio.Button value="4+">4+</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of last vaccination:"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValue={sample_date ? moment(sample_date) : null}
                    name="dateOfLastVaccination"
                    rules={[
                      {
                        required: true,
                        message: "Fill this field!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{ width: "100%" }}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Source of vaccination history"
                    name="sourceOfVaccinationHistory"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please choose one, compulsory!",
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="card">Vaccine Card</Radio.Button>
                      <Radio.Button value="verbal">Verbal</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </>
            )}

            {formValues?.vaccinationStatus === "notVaccinated" && (
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label="If not vaccinated, indicate reason"
                  name="notVaccinated"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Enter Reason ",
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
                    <Radio.Button value="religious_exemption">
                      {" "}
                      Religious Exemption
                    </Radio.Button>
                    <Radio.Button value="medical_contraindication">
                      Medical Contraindication
                    </Radio.Button>
                    <Radio.Button value="under_age">Under age</Radio.Button>
                    <Radio.Button value="parental_refusal">
                      Parental Refusal
                    </Radio.Button>
                    <Radio.Button value="unknown">Unknown</Radio.Button>
                    <Radio.Button value="others">Others</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            )}

            {formValues?.vaccinationStatus === "notVaccinated" &&
              formValues?.notVaccinated === "others" && (
                <>
                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Other Reasons not vaccinated?"
                      name="otherReasonNoVaccine"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input
                        placeholder="Enter place Address"
                        id="address"
                        name="address"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </>
              )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient travel during or after illness?"
                name="didThePatientTravelDuringOrAfterIllness"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please choose one, compulsory!",
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="didThePatientTravelDuringOrAfterIllness"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.didThePatientTravelDuringOrAfterIllness === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Travel Address of patient during or after illness"
                    name="clientaddress"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="If Yes, enter address visited"
                      id="address"
                      name="address"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Patient hospitalized or visit anyone in the hospital before illness?"
                name="patientHospitalizedOrVisitAnyoneInTheHospitalBeforeIllness"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please choose one, compulsory!",
                  },
                ]}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="patientHospitalizedOrVisitAnyoneInTheHospitalBeforeIllness"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.patientHospitalizedOrVisitAnyoneInTheHospitalBeforeIllness ===
              "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Hospitalization Status"
                    name="hospitalizationStatus"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Fill this field!",
                      },
                    ]}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="in-patient">In-patient</Radio.Button>
                      <Radio.Button value="out-patient">
                        Out-patient
                      </Radio.Button>
                      <Radio.Button value="visitingFriend">
                        Visiting Acquaintance
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of visit or hospitalization?"
                    name="dateHospitalVisit"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Please choose date of visit!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{ width: "100%" }}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={8} md={8} sm={24}>
                  <Form.Item
                    label="Name of Hospital"
                    name="nameHospital"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Hospital Name"
                      id="hospitalName"
                      name="hospitalName"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Address of hospital visited or hospitalized in?"
                    name="addressHospitalVisit"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter place Address"
                      id="address"
                      name="address"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Was the patient admitted in the isolation ward?"
                name="wasThePatientAdmittedInTheIsolationWard"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="wasThePatientAdmittedInTheIsolationWard"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.wasThePatientAdmittedInTheIsolationWard === "yes" && (
              <>
                <Col lg={8} md={8} sm={24}>
                  <Form.Item
                    label="Date of admission?"
                    name="dateAdmission"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{ width: "100%" }}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={8} md={8} sm={24}>
                  <Form.Item
                    label="Date of discharge"
                    name="dateDischarge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{ width: "100%" }}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={8} md={8} sm={24}>
                  <Form.Item
                    label="Patient outcome at discharge"
                    name="patientOutcomeDischarge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="Alive">Alive</Radio.Button>
                      <Radio.Button value="Dead">Dead</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did case visit a traditional healer in 3weeks before onset"
                name="locationTraditionalHealer"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="locationTraditionalHealer"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.locationTraditionalHealer === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
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
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
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
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient receive traditional medicine?"
                name="traditionalMedicine"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="traditionalMedicine"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.traditionalMedicine === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Traditional Medicine type"
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
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={24} md={12} sm={24}>
              <Form.Item
                label="Did case attend funeral ceremonies anytime in the 3 weeks before illness?"
                name="visitFuneralCeremonies"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 12 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient have contact with a known suspect / confirmed case anytime in the three weeks before becoming ill?"
                name="contactSuspectConfirmed"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 12 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="contactSuspectConfirmed"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.contactSuspectConfirmed === "yes" && (
              <>
                <Col lg={12} md={12} sm={12}>
                  <Form.Item
                    label="Epid number of the case"
                    name="epidCase"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <Input
                      placeholder="Enter Epid Number of case"
                      id="epidNumber"
                      name="epidNumber"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient have contact with a wild animal (non-human primate or others)?"
                name="animalContact"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="animalContact"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.animalContact === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Kind of animal"
                    name="kindAnimal"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Animal Name"
                      id="kindAnimalName"
                      name="epidNumber"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>
              </>
            )}

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Was the patient admitted in the isolation ward?"
                name="wasThePatientAdmittedInTheIsolationWard"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 12 }}
              >
                <Radio.Group
                  buttonStyle="solid"
                  onChange={(e) =>
                    handleUpdateInputValues(e.target.name, e.target.value)
                  }
                  name="wasThePatientAdmittedInTheIsolationWard"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {formValues?.wasThePatientAdmittedInTheIsolationWard === "yes" && (
              <>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Name of Hospital"
                    name="nameHospital"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input
                      placeholder="Enter Hospital Name"
                      id="hospitalName"
                      name="hospitalName"
                      onChange={(e) => {}}
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of admission?"
                    name="dateAdmission"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{ width: "100%" }}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of discharge"
                    name="dateDischarge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{ width: "100%" }}
                      placeholder="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Patient outcome at discharge"
                    name="patientOutcomeDischarge"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button value="Alive">Alive</Radio.Button>
                      <Radio.Button value="Dead">Dead</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default Epidemiological;
