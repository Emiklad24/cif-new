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
const laboratoryData = ['ACEGID -African Centre of Excellence for Genomics of Infectious Diseases, Ogun', 
'AE-FUTHA -Alex Ekwueme Federal University Teaching Hospital Virology Laboratory', 
'BUK -Bayero University Kano Centre for Infectious Disease and Research, Kano', 
'FMC JALINGO -Federal Medical Centre, Jalingo, Taraba', 'FMC OWO -Federal Medical Centre Owo, Ondo', 
'ISTH -Irrua Specialist Teaching Hospital, Edo', 'LUTH -Lagos University Teaching Hospital Virology Laboratory, Lagos',
'MOGID -Molecular Genetics and Infectious Diseases Research Laboratory, Bauchi',
'NRL -National Reference Laboratory Gaduwa, FCT' ];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const [nameOfTestingLaboratory, setLaboratory] = useState('');
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
                label="Specimen Collected"
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
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen Collected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={collection_date ? moment(collection_date) : null}
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
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Specimen collected"
                name="specimenType"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Blood', value: 'blood' },
                      { label: 'Other', value: 'other' },

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
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={setLaboratory}
                >
                  {laboratoryData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
              ))}

              </Select>
              </Form.Item>

            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen Sent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_sent_date ? moment(sample_sent_date) : null}
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
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
            </Row>
            <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Specimen Received?"
                name="typeOfSpecimenReceived"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Blood', value: 'blood' },
                      { label: 'Other', value: 'other' },

                    ]
                  }
                  name="typeOfSpecimenReceived"
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen Received"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={sample_received_date ? moment(sample_received_date) : null}
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
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Form.Item
                label="Laboratory ID"
                name="laboratoryId"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter laboratoryId"
                  id="laboratoryId"
                  name="laboratoryId"
                  onChange={(e) => {}}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen Condition"
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
                  <Radio.Button value="inadequate">Inadequate</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Test Conducted"
                name="typeOfTestConducted"
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
                  <Radio.Button value="pcr_rtpcr">PCR/RT-PCR</Radio.Button>
                  <Radio.Button value="other">Other</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Result Available"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={result_date ? moment(result_date) : null}
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
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="PCR/RT-PCR Test Result"
                name="pcrTestResult"
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
                  <Radio.Button value="positive">Positive</Radio.Button>
                  <Radio.Button value="negative">Negative</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Result Sent Out"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={result_date ? moment(result_date) : null}
                name="dateResultSentOut"
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
                  style={{width: "100%"}}
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
