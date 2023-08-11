import {
  Col,
  Form,
  Input,
  Collapse, DatePicker,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";
import moment from "moment";

const { Option } = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
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
    console.log('Received values of form: ', values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Mother Vaccinated with TT"
                name="motherVaccinated"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
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
                label="If yes, number of doses"
                name="numberOfDoses"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify number of doses"
                  onChange={(e) => {
                  }}
                  type="number"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date of last dose"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfLastDose"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
                  },
                ]}
              >
                <DatePicker
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>



            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Source of Vaccination history"
                name="sourceOfVaccinationHistory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="card">Card</Radio.Button>
                  <Radio.Button value="verbal">Verbal</Radio.Button>

                </Radio.Group>
              </Form.Item>
            </Col>


            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Vaccination status of mother prior to delivery"
                name="sourceOfVaccinationHistory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="up to date">Up to date</Radio.Button>
                  <Radio.Button value="not up to date">Not up to date</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="Location of birth"
                name="sourceOfVaccinationHistory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="hospital">Hospital</Radio.Button>
                  <Radio.Button value="health center">Health center</Radio.Button>
                  <Radio.Button value="home trained attendant">Home trained attendant</Radio.Button>
                  <Radio.Button value="home untrained attendant">Home untrained attendant</Radio.Button>
                  <Radio.Button value="home,no attendant">home, no attendant</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24}>
              <Form.Item
                label="Cut cord with sterile blade"
                name="cutCordWithSterileBlade"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
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

            <Col lg={12} md={24} sm={24}>
              <Form.Item
                label="Cord treated with anything"
                name="cordTreated"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
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
                label="Describe Treatment"
                name="describeTreatment"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Describe treatment"
                  onChange={(e) => {
                  }}
                  type="text"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24}>
              <Form.Item
                label="Mother received antenatal care"
                name="motherReceivedAntenatalCare"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
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
                label="If yes, where ?"
                name="locationOfAntenatalReceived"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify location of antenatal care received"
                  onChange={(e) => {
                  }}
                  type="text"
                />
              </Form.Item>
            </Col>

            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="If birth in institution, name of institution"
                name="nameOfBirthInstitution"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify institution of birth"
                  onChange={(e) => {
                  }}
                  type="text"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="How many prenatal visits"
                name="numberOfPrenatalVisits"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Input
                  placeholder="Specify number of prenatal visits"
                  onChange={(e) => {
                  }}
                  type="number"
                />
              </Form.Item>
            </Col>


            <Col lg={12} md={24} sm={24}>
              <Form.Item
                label="Attended to by a Doctor ?"
                name="attendedByDoctor"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
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



            <Col lg={12} md={24} sm={24}>
              <Form.Item
                label="Attended by a trained TBA/Midwife"
                name="attendedByTrainedTbaOrMidwife"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
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



          </Row>
        </Panel>
      </Collapse>


    </>
  );
};
export default Epidemiological;
