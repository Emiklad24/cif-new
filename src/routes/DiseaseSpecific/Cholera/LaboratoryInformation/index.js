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
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Specimen collected"
              name="specimenTaken"
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
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Date specimen was collected"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}

              name="dateSpecimenWasTaken"
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <DatePicker
                // onChange={onChangeDoB}
                disabledDate={(current) =>
                  current.isAfter(moment()) || isDatePickerDisabled
                }
                style={{ width: "100%" }}
                placeholder="DD-MM-YYYY"
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <Form.Item
              label="Type of specimen collected"
              name="sampleType"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <CheckboxGroup
                options={

                  [
                    { label: 'Stool', value: 'face' },
                    { label: 'Rectal swab', value: 'leg' },


                  ]
                }
                name="specimentype"
              />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Name of testing Laboratory"
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
                  <Radio.Button value="centralpublichealthlab">Central Public Health Laboratory (CPHL)</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
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

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date of specimen tested"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={tested_date ? moment(tested_date) : null}
                name="dateSpecimenTested"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoT}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Test Result"
                name="testResult"
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
                  <Radio.Button value="pending">Pending</Radio.Button>


                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Date Result sent to State"
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
                  // onChange={onChangeDoT}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                  format="DD-MM-YYYY"
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
