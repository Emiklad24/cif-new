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


const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const ClinicalHistory = () => {
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
        <Panel header="Clinical history: Sign and Symptoms" key="1">
          <Row>
           <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Fever (≥38 °C) or history of fever"
                name="fever"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Sore throat"
                name="soreThroat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Shortness of Breath
                "
                name="shortBreath"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Headache"
                name="headache"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Vomiting"
                name="vomit"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Tiredness"
                name="tired"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Dehydration"
                name="dehydrated"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Nausea
                "
                name="nausea"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Chest pains"
                name="chestPains"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Diarrhea"
                name="diarrhea"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Loss of sense of smell"
                name="lossSmell"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Loss of sense of taste"
                name="lossTaste"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label=" Red Eyes"
                name="redEyes"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option",
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
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Other symptom please specify"
                name="OtherSymptoms"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Fill this field",
                  },
                ]}
              >
                <Input
                  placeholder="Other Symptoms"
                  id="otherSymptoms "
                  name="otherSymptoms"
                  type="text"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of Symptom Onset"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select a date",
                  },
                ]}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateOfSymptomOnset"
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  // onChange={onChangeDoB}
                  placeholder="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default ClinicalHistory;
