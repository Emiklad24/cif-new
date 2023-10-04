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
import "styles/pages/form.less";
import moment from "moment";

const { Option } = Select;

const stateData = ["FCT", "Enugu"];
const facilityData = ["Federal Medical Center", "Jabi Clinic"];
const treatmentData = [
  "Fluids",
  " Plasma",
  " Blood Transfusion",
  " Antibiotics",
  " Ocytocin",
  " Anti-seizure drugs",
  " Oxygen",
  " Anti-malarial",
  " Other medical treatment",
  " Surgery",
  " Manual removal of placenta",
  " Manual intra uterin aspiration",
  " Curettage",
  "laporotomy",
  "hysterctomy",
  "intsrumental delivery (Forceps;Vacuum)",
  "Caesarian section",
  "anetshesia ( general, spinal, epidural , local)",
];
const deliveryTypeData = [
  "Vaginal non-assisted-delivery",
  "Vaginal assisted-delivery (Vacuum/forceps)",
  "Caesarean section",
];
const babyAliveOrDeadData = [
  "Still alive",
  "Neonatal death",
  "Died beyond 28 days of age",
];
const conditionData = [
  "Alive",
  " Fresh Still birth",
  "Macerated still birth",
  "Not applicable",
];

const timeOfDeathData = [
  "During pregnancy",
  "During delivery",
  "During the immediate post partum period, or long after delivery",
];
const causeOfDeathData = [
  "Pre-eclampsia /eclampsia",
  "Puerperal sepsis",
  "Prolonged/Obstructed labour",
  "Ruptured uterus",
  "Complications of abortions",
  "Ectopic pregnancy",
  "Other specify",
];



const ClinicalHistory = () => {
  const { Panel } = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formData, setData] = useState({});

  
  const handleFormData = (name, value) => {
    console.log(name, value);
    setData({ ...formData, [name]: value });
  };

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
            {/* Medical/File number */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Medical/File number"
                name="file_number"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Medical/File number!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter number"
                  id="file_number"
                  name="file_number"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* Hospitalized(Admitted) */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Hospitalized (Admitted)"
                name="hospitalized"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please indicate!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="hospitalized"
                  id="hospitalized"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Date of hopsitalization (if on admission/in-patient) */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date of hopsitalization (if on admission/in-patient)"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfHospitalization"
              >
                <DatePicker
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

            {/* Date patient died */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date patient died"
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

            {/* Was the deceased referred from other health facility or hospital?  */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Was the deceased referred from other health facility or hospital? "
                name="deceasedReferredFromOtherFacility"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please indicate!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="deceasedReferredFromOtherFacility"
                  id="deceasedReferredFromOtherFacility"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* If yes, how long did it take to get here? (hours) */}
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="If yes, how long did it take to get here? (hours)"
                name="howLongDidItTake"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter number of hours"
                  type="number"
                  id="howLongDidItTake"
                  name="howLongDidItTake"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* Did the deceased receive any medical care or obstetrical/surgical interventions for what led to her death?*/}
            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="Did the deceased receive any medical care or obstetrical/surgical interventions for what led to her death? "
                name="deceasedReceivedMedicalCare"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please indicate!",
                  },
                ]}
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="deceasedReceivedMedicalCare"
                  id="deceasedReceivedMedicalCare"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* If yes, specify where and the treatment received */}
            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="If yes, specify where and the treatment received"
                name="whereAndTheTreatmentReceived"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Specify where and the treatment received"
                  type="text"
                  id="whereAndTheTreatmentReceived"
                  name="whereAndTheTreatmentReceived"
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

          {/* Cause(s) of death */}
          <Row>
            <Col lg={24} md={24} sm={12} xs={24}>
              <Form.Item
                label="Cause(s) of death"
                style={{ fontStyle: "italic" }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              ></Form.Item>
            </Col>
          </Row>

          <Row>
            {/* Primary Cause of death */}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Suspected Cause of death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="suspectedCauseOfDeath"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select placeholder="Select Primary Cause of death" allowClear>
                  {causeOfDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* If abortion: was it spontaneous or induced?*/}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="If abortion: was it spontaneous or induced?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="abortionSponteneousOrInduced"
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="abortionSponteneousOrInduced"
                  id="abortionSponteneousOrInduced"
                >
                  <Radio.Button value="Spontaneous">Spontaneous</Radio.Button>
                  <Radio.Button value="Induced">Induced</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Time of death */}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Time of death"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="timeOfDeath"
                rules={[
                  {
                    required: true,
                    message: "Please select one!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Time of death"
                  allowClear
                  onSelect={(e) => handleFormData("timeOfDeath", e)}
                >
                  {timeOfDeathData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* At the time of death, was the baby delivered?*/}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="At the time of death, was the baby delivered?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="babyDeliveredAtTimeOfDeath"
              >
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="babyDeliveredAtTimeOfDeath"
                  id="babyDeliveredAtTimeOfDeath"
                >
                  <Radio.Button value="Yes">Yes</Radio.Button>
                  <Radio.Button value="No">No</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Condition of the baby at the time of delivery*/}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Condition of the baby at the time of delivery"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="conditionOfBabyAtTheTimeOfDelivery"
              >
                <Select
                  placeholder="Select Condition"
                  allowClear
                  onSelect={(e) =>
                    handleFormData("conditionOfBabyAtTheTimeOfDelivery", e)
                  }
                >
                  {conditionData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* In case the baby was born alive, is he/she still alive or died within 28 days after his/her birth ? */}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="In case the baby was born alive, is he/she still alive or died within 28 days after his/her birth ? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="babyAliveOrDeadAfter28Days"
              >
                <Select
                  placeholder="Select Condition"
                  allowClear
                  onSelect={(e) =>
                    handleFormData("babyAliveOrDeadAfter28Days", e)
                  }
                >
                  {babyAliveOrDeadData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Maternal death history and risk factors */}
          <Row>
            <Col lg={24} md={24} sm={12} xs={24}>
              <Form.Item
                label="Maternal death history and risk factors"
                style={{ fontStyle: "italic" }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              ></Form.Item>
            </Col>
          </Row>

          {/* Was the deceased receiving any antenatal care?*/}
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Was the deceased receiving any antenatal care? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="deceasedReceivedAntenatal"
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
                  name="deceasedReceivedAntenatal"
                  id="deceasedReceivedAntenatal"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
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
                {" "}
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

          {/* Did she have Hypertension ?*/}
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Did she have Hypertension ? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="haveHypertension"
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
                  name="haveHypertension"
                  id="haveHypertension"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Did she have Abnormal Life?*/}
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Did she have Abnormal Life? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="haveAbormalLife"
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
                  name="haveAbormalLife"
                  id="haveAbormalLife"
                >
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* What was her HIV status?*/}
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="What was her HIV status? "
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="hivStatus"
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
                  name="hivStatus"
                  id="hivStatus"
                >
                  <Radio.Button value="positive">HIV+</Radio.Button>
                  <Radio.Button value="negative">HIV-</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* How long (hours) was the duration of labor?*/}
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="How long (hours) was the duration of labor?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="durationOfLabour"
              >
                <Input
                  type="number"
                  placeholder="State How long (hours) was the duration of labor"
                  id="durationOfLabour"
                  name="durationOfLabour"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            {/* What type of delivery was it? */}
            <Col lg={12} md={12} sm={12} xs={24}>
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
          </Row>

          <Row>
            {/* Treatments */}
            <Col lg={24} md={24} sm={12} xs={24}>
              <Form.Item
                label="Treatments"
                style={{ fontStyle: "italic" }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              ></Form.Item>
            </Col>
          </Row>
          <Row>
            {/* Treatment [Please Tick as appropriate]*/}
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Treatment [Please Tick as appropriate]"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="treatment"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one",
                  },
                ]}
              >
                <Select
                  placeholder="Select Treatment(s)"
                  mode="multiple"
                  allowClear
                  onSelect={(e) => handleFormData("treatment", e)}
                >
                  {treatmentData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default ClinicalHistory;
