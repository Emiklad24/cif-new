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

  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient travel during or after illness?"
                name="patientTravelIllness"
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
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Travel Address of patient during or after illness"
                name="clientaddress"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter address visited"
                  id="address"
                  name="address"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={24} md={12} sm={24}>
              <Form.Item
                label="Patient hospitalized or visit anyone in the hospital before illness?"
                name="caseHospitalized"
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
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Address of hospital visited or hospitalized in?"
                name="addressHospitalVisit"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter hospital Address"
                  id="address"
                  name="address"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>

            <Col lg={24} md={12} sm={24}>
              <Form.Item
                label="Did case visit a traditional healer in 3weeks before onset"
                name="locationTraditionalHealer"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient receive traditional medicine?"
                name="traditionalMedicine"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
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
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

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

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient have contact with a wild animal (non-human primate or others)?"
                name="animalContact"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
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

            <Col lg={24} md={12} sm={24}>
              <Form.Item
                label="Was the patient admitted in the isolation ward?"
                name="caseAdmission"
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
                label="Name of Hospital"
                name="nameOfHospital"
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
                name="dateOfAdmission"
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
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default Epidemiological;
