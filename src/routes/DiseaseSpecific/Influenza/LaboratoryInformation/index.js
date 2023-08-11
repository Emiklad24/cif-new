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
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
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
        <Panel header="Laboratory information" key="1">
          <Row>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen Collected?"
                name="specimenCollected"
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
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of Specimen Collected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={symptom_date ? moment(symptom_date) : null}
                name="dateSpecimenCollected"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
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
                label="Type of Specimen collected?"
                name="specimenType"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select a specimen type!",
                  },
                ]}              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Throat/Oropharyngeal', value: 'throat_oropharyngeal' },
                      { label: 'Nasal/Nasopahryngeal', value: 'nasal_nasopahryngeal ' },                      
                    ]
                  }
                  name="specimenType"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Name of Testing Laboratory"
                name="nameOfTestingLaboratory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="nationalrefrencelab">National Refrence Laboratory (NRL)</Radio.Button>                  
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={8} sm={24}>
              <Form.Item
                label="Date of Sample Sent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={symptom_date ? moment(symptom_date) : null}
                name="dateSampleSent"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
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
            <Row>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Specimen Received?"
                name="typeOfSpecimenReceived"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
                  },
                ]}              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Throat/Oropharyngeal', value: 'throat_oropharyngeal' },
                      { label: 'Nasal/Nasopahryngeal', value: 'nasal_nasopahryngeal ' },                      
                    ]
                  }
                  name="typeOfSpecimenReceived"
                />
              </Form.Item>
            </Col>  

            <Col lg={12} md={8} sm={24}>
              <Form.Item
                label="Date of Specimen Received"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={symptom_date ? moment(symptom_date) : null}
                name="dateSpecimenReceived"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
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
                label="Laboratory ID"
                name="laboratoryId"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter specimen Id"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
            </Row>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen Condition?"
                name="specimenCondition"
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
                  <Radio.Button value="adequate">Adequate</Radio.Button>
                  <Radio.Button value="notadequate">Not adequate</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Test Conducted?"
                name="typeOfTestConducted"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
                  },
                ]}              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'PCR', value: 'PCR' },                   
                    ]
                  }
                  name="typeOfTestConducted"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="PCR Result"
                name="PCR_result"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="positive">Positive</Radio.Button>
                  <Radio.Button value="negative">Negative</Radio.Button>
                  <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="notdone">Not Done</Radio.Button>


                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={8} sm={24}>
              <Form.Item
                label="Date of Result Available"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={tested_date ? moment(tested_date) : null}
                name="dateResultAvailable"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
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

            <Col lg={12} md={8} sm={24}>
              <Form.Item
                label="Date Result sent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={resultsent_date ? moment(resultsent_date) : null}
                name="dateResultSent"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
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
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default LaboratoryInformation;
