import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import "styles/pages/form.less";

const { Option } = Select;

const causeOfDeathData = ["Cause 1", "Cause 2", "Cause 3"];
const yesNoUnkownData = ["Yes", "No", "Unknown"];
const birthWeightInGramsData = [
  ">=2500",
  "1500-2499 (LBW)",
  "1000-1499g (VLBW)",
  "<1000 (ELBW)",
];
const deliveryTypeData = [
  "Vaginal non-assisted-delivery",
  "Vaginal assisted-delivery (Vacuum/forceps)",
  "Caesarean section",
];
const typeOfPregnancyData = ["Singleton", "Twin", "Higher Multiples"];
const classificationOfPerinatalDeathData = [
  "Neonatal death",
  "Fresh stillbirth",
  "Macerated stillbirth",
];

const ClinicalHistory = () => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    
  };

  const [formData, setData] = useState({});
  const handleFormData = (name, value) => {
   
    setData({ ...formData, [name]: value });
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <>
          <Row>
            {/* Date Patient Died */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Patient Died"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="datePatientDied"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Date Patient Died!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  id="datePatientDied"
                  name="datePatientDied"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            {/* Primary Cause of death */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Primary Cause of death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="primaryCauseOfDeath"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Primary Cause of death"
                  allowClear
                  onSelect={(e) => handleFormData("primaryCauseOfDeath", e)}
                >
                  {causeOfDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Secondary Cause of death */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Secondary Cause of death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="secondaryCauseOfDeath"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Secondary Cause of death"
                  allowClear
                  onSelect={(e) => handleFormData("secondaryCauseOfDeath", e)}
                >
                  {causeOfDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Other causes(specify) */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Other causes(specify)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="otherCausesOfDeathSpecify"
              >
                <Input
                  placeholder="Other causes(specify)"
                  id="otherCausesOfDeathSpecify"
                  name="otherCausesOfDeathSpecify"
                  type="text"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* Classification of perinatal/Newborn death */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Classification of perinatal/Newborn death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="classificationOfPerinatalDeath"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Select placeholder="Select classification" allowClear>
                  {classificationOfPerinatalDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Birth weight (in grams) */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Birth weight (in grams)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="birthWeightInGrams"
                rules={[
                  {
                    required: true,
                    message: "Please enter the weight!",
                  },
                ]}
              >
                <Input
                  placeholder="Birth weight (in grams)"
                  id="birthWeightInGrams"
                  name="birthWeightInGrams"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Gestation at birth (in weeks) */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Gestation at birth (in weeks)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="gestationAtBirthInWeeks"
                rules={[
                  {
                    required: true,
                    message: "Please enter the weeks",
                  },
                ]}
              >
                <Input
                  placeholder="Gestation at birth (in weeks)"
                  id="gestationAtBirthInWeeks"
                  name="gestationAtBirthInWeeks"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* Date of Birth */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of Birth"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Date of Birth",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  id="dateOfBirth"
                  name="dateOfBirth"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            {/* Date of hospitalization (admission)  */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of hospitalization (admission) "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfHospitalization"
                rules={[
                  {
                    required: true,
                    message: "Please enter Date of hospitalization!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  id="dateOfHospitalization"
                  name="dateOfHospitalization"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            {/* Date of Date */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of Death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfDeath"
                rules={[
                  {
                    required: true,
                    message: "Please enter Date of Death!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  id="dateOfDeath"
                  name="dateOfDeath"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
          </Row>
        </>

        <>
          {/* <Row>

            <Col lg={24} md={24} sm={12} xs={24}>
              <Form.Item
                label="Perinatal Death history and risk factors"
                style={{ fontStyle: "italic" }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              ></Form.Item>
            </Col>
          </Row> */}

          <Row>
            {/* Type of pregnancy */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Type of pregnancy"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="typeOfPregnancy"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Type of pregnancy"
                  allowClear
                  onSelect={(e) => handleFormData("typeOfPregnancy", e)}
                >
                  {typeOfPregnancyData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={8} xs={24}>
              <Form.Item
                label="Did the mother of the deceased receive any antenatal care?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherReceivedAntenatalCare"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Did the mother of the deceased receive any antenatal care?"
                  allowClear
                >
                  {yesNoUnkownData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* If yes to the above question, how many visits? */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="If yes to the above question, how many visits?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="howManyAntenatalVisits"
              >
                <Input
                  placeholder="How many antenatal visits?"
                  id="howManyAntenatalVisits"
                  name="howManyAntenatalVisits"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Did the mother of the deceased have malaria?*/}
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Did the mother of the deceased have malaria? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedHavePreeclamsiaDisease"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedHaveMalaria"
                  id="motherOfDeceasedHaveMalaria"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* If yes to question above, did the mother receive treatment */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If yes to question above, did the mother receive treatment? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedReceivedMalariaTreatment"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                {" "}
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedReceivedMalariaTreatment"
                  id="motherOfDeceasedReceivedMalariaTreatment"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Did the mother of the deceased have pre-eclampsia disease ? */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Did the mother of the deceased have pre-eclampsia disease ? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedHavePreeclamsiaDisease"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedHavePreeclamsiaDisease"
                  id="motherOfDeceasedHavePreeclamsiaDisease"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* If yes to the question above, did the mother receive any treatment ? */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If yes to the question above, did the mother receive any treatment ? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedReceivedMalariaTreatment"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedReceivedMalariaTreatment"
                  id="motherOfDeceasedReceivedMalariaTreatment"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Did the mother of the deceased have severe anaemia (HB,7g/dl) */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Did the mother of the deceased have severe anaemia (HB,7g/dl) "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedHaveSeverAnaemia"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedHaveSeverAnaemia"
                  id="motherOfDeceasedHaveSeverAnaemia"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* If yes to the question above, did the mother receive any treatment ? */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If yes to the question above, did the mother receive any treatment ? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedReceiveSeverAnaemiaTreatment"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedReceiveSeverAnaemiaTreatment"
                  id="motherOfDeceasedReceiveSeverAnaemiaTreatment"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Did the mother of the deceased have recommended maternal immunizations (e.g. tetanus toxoid) */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Did the mother of the deceased have recommended maternal immunizations (e.g. tetanus toxoid) "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedHaveMaternalImmunizations"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedHaveMaternalImmunizations"
                  id="motherOfDeceasedHaveMaternalImmunizations"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* If Rhesus positive, did the mother of the deceased receive Anti-D injection during this baby’s pregnancy? */}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If Rhesus positive, did the mother of the deceased receive Anti-D injection during this baby’s pregnancy? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="motherOfDeceasedReceiveAntiDInjection"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="motherOfDeceasedReceiveAntiDInjection"
                  id="motherOfDeceasedReceiveAntiDInjection"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* What was the HIV status of the mother?*/}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="What was the HIV status of the mother? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="hivStatusOfMother"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="hivStatusOfMother"
                  id="hivStatusOfMother"
                >
                  <Radio.Button value="positive">HIV+</Radio.Button>
                  <Radio.Button value="negative">HIV-</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* What was the status of the syphilis test of mother?*/}
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="What was the status of the syphilis test of mother? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="syphilisStatusOfMother"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="syphilisStatusOfMother"
                  id="syphilisStatusOfMother"
                >
                  <Radio.Button value="positive">+Ve</Radio.Button>
                  <Radio.Button value="negative">-Ve</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Date of Birth */}
            <Col lg={5} md={5} sm={24} xs={24}>
              <Form.Item
                label="Date of Birth"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfBirth2"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Date of Birth",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  id="dateOfBirth2"
                  name="dateOfBirth2"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            {/* Attendance at delivery */}
            <Col lg={11} md={11} sm={11} xs={24}>
              <Form.Item
                label="Attendance at delivery"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="attendanceAtDelivery"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="attendanceAtDelivery"
                  id="attendanceAtDelivery"
                >
                  <Radio.Button value="Nurse">Nurse</Radio.Button>
                  <Radio.Button value="Midwife">Midwife</Radio.Button>
                  <Radio.Button value="Doctor">Doctor</Radio.Button>
                  <Radio.Button value="Other">Other (specify)</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Specify */}
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="If other, please specify"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="attendanceOtherSpecify"
              >
                <Input
                  placeholder="Specify other attendance"
                  id="attendanceOtherSpecify"
                  name="attendanceOtherSpecify"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Was fetal heart rate assessed on admission?  */}
            <Col lg={6} md={6} sm={12} xs={24}>
              <Form.Item
                label="Was fetal heart rate assessed on admission? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="fetalHeartRateAssessed"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="fetalHeartRateAssessed"
                  id="fetalHeartRateAssessed"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* What type of delivery was it? */}
            <Col lg={10} md={10} sm={10} xs={24}>
              <Form.Item
                label="What type of delivery was it?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="typeOfDelivery"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Select
                  placeholder="Select Type"
                  allowClear
                  onSelect={(e) => handleFormData("typeOfDelivery", e)}
                >
                  {deliveryTypeData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Birth weight in grams */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Birth weight in grams"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="birthWeightInGrams2"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Select
                  placeholder="Select Weight Range"
                  allowClear
                  onSelect={(e) => handleFormData("birthWeightInGrams2", e)}
                >
                  {birthWeightInGramsData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Did the mother of the deceased have premature rupture of membranes (PROM)*/}
          <Row>
            <Col lg={16} md={16} sm={16} xs={24}>
              <Form.Item
                label="Did the mother of the deceased have premature rupture of membranes (PROM) "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="havePrematureRuptureOfMembrane"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one!",
                  },
                ]}
              ></Form.Item>
            </Col>
            <Col lg={8} md={8} sm={12} xs={24}>
              <Radio.Group
                defaultValue=""
                buttonStyle="solid"
                name="havePrematureRuptureOfMembrane"
                id="havePrematureRuptureOfMembrane"
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <Row>
            {/* Gestation at birth (in weeks) */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Gestation at birth (in weeks)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="gestationAtBirthInWeeks2"
                rules={[
                  {
                    required: true,
                    message: "Please enter the weeks",
                  },
                ]}
              >
                <Input
                  placeholder="Gestation at birth (in weeks)"
                  id="gestationAtBirthInWeeks2"
                  name="gestationAtBirthInWeeks2"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* If stillbirth – gestational age ( in weeks) of the deceased */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="If stillbirth – gestational age ( in weeks) of the deceased)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="gestationAtBirthInWeeksIfStillbirth"
                rules={[
                  {
                    required: true,
                    message: "Please enter the weeks",
                  },
                ]}
              >
                <Input
                  placeholder="Gestation at birth (in weeks), if stillbirth"
                  id="gestationAtBirthInWeeksIfStillbirth"
                  name="gestationAtBirthInWeeksIfStillbirth"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* Date of hospitalization (admission)  */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date of hospitalization (admission) "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfHospitalization2"
                rules={[
                  {
                    required: true,
                    message: "Please enter Date of hospitalization!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  id="dateOfHospitalization2"
                  name="dateOfHospitalization2"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            {/* How long (hours) was the duration of labor */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="How long (hours) was the duration of labor"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="durationOfLabour"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter How long (hours) was the duration of labor!",
                  },
                ]}
              >
                <Input
                  placeholder="How long (hours) was the duration of labor"
                  id="durationOfLabour"
                  name="durationOfLabour"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* If neonatal – gestational age ( in weeks) of the deceased */}
            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="If neonatal – gestational age ( in weeks) of the deceased)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="gestationAtBirthInWeeksIfNeonatal"
                rules={[
                  {
                    required: true,
                    message: "Please enter the weeks",
                  },
                ]}
              >
                <Input
                  placeholder="Gestation at birth (in weeks), if neonatal death"
                  id="gestationAtBirthInWeeksIfNeonatal"
                  name="gestationAtBirthInWeeksIfNeonatal"
                  type="number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* If the deceased baby was born alive what was the APGAR Score ?. */}
            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="If the deceased baby was born alive what was the APGAR Score ?."
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="apgarScore"
                rules={[
                  {
                    required: true,
                    message: "Please enter the weeks",
                  },
                ]}
              >
                <Input
                  placeholder="Enter APGAR Score"
                  id="apgarScore"
                  name="apgarScore"
                  type="text"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* If the deceased baby was born alive, wasresuscitation with bag and mask conducted?.  */}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If the deceased baby was born alive, was resuscitation with bag and mask conducted?. "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="resuscitationWithBagAndMaskConducted"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="resuscitationWithBagAndMaskConducted"
                  id="resuscitationWithBagAndMaskConducted"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* If the deceased baby was born alive was he/she referred to any health facility or hospital?*/}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If the deceased baby was born alive was he/she referred to any health facility or hospital?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="babyAliveReferedToFacility"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="babyAliveReferedToFacility"
                  id="babyAliveReferedToFacility"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                  <Radio.Button value="Unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* If the deceased baby was born alive did he/she receive any other medical care beyond resuscitation?*/}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If the deceased baby was born alive did he/she receive any other medical care beyond resuscitation?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="babyReceivedOtherMedicalCare"
                rules={[
                  {
                    required: true,
                    message: "Please select one",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="babyReceivedOtherMedicalCare"
                  id="babyReceivedOtherMedicalCare"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                  <Radio.Button value="Unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* If yes, specify where and the treatment received:* I.V. Fluids; Blood/Plasma transfusion; Antibiotics; Oxygen; Other medical treatment;*/}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="If yes, specify where and the treatment received:* I.V. Fluids; Blood/Plasma transfusion; etc;"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="whereAndOtherTreatmentReceived"
              >
                <Input
                  placeholder="Please specify where and the treatment received"
                  id="whereAndOtherTreatmentReceived"
                  name="whereAndOtherTreatmentReceived"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Primary Cause of death */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Primary Cause of death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="primary_cause_of_death2"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Primary Cause of death"
                  allowClear
                  onSelect={(e) => handleFormData("primary_cause_of_death2", e)}
                >
                  {causeOfDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Secondary Cause of death */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Secondary Cause of death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="secondaryCauseOfDeath2"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Secondary Cause of death"
                  allowClear
                  onSelect={(e) => handleFormData("secondaryCauseOfDeath2", e)}
                >
                  {causeOfDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Maternal condition (if applicable) */}
            <Col lg={8} md={8} sm={12} xs={24}>
              <Form.Item
                label="Maternal condition (if applicable)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="maternal_condition"
              >
                <Input
                  placeholder="Enter condition"
                  id="maternal_condition"
                  name="maternal_condition"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Any physical malformation noted on the deceased? */}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Any physical malformation noted on the deceased?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="physicalMalformation"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="physicalMalformation"
                  id="physicalMalformation"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* If yes, type of birth defect (with full description) */}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="If yes, type of birth defect (with full description)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="typeOfBirthDefectWithDescription"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Input
                  placeholder="Describe the birth defect"
                  id="typeOfBirthDefectWithDescription"
                  name="typeOfBirthDefectWithDescription"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* Analysis and interpretation of the information collected so far (investigator’s opinion on this death) */}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Analysis and interpretation of the information collected so far (investigator’s opinion on this death)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="analysisAndInterpretationOfInformation"
              >
                <Input
                  placeholder="State analysis and interpretation of information"
                  id="analysisAndInterpretationOfInformation"
                  name="analysisAndInterpretationOfInformation"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
          </Row>
        </>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
