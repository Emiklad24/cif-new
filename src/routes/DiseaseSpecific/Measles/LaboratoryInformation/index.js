import {
  Col,
  Form,
  Input,
  Collapse, DatePicker,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, {useState} from 'react';
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const {Option} = Select;

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
  const {Panel} = Collapse;
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
  const nameOfTestingLaboratory = [
    'YDML', 'NRL', 'UNTH', 'UBTH'
  ];

  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Laboratory information" key="1">
          
          <Row>  
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Specimen Collected"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="specimenCollected"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yse">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            
            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Date Specimen Collected"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
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
          
            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Type of Specimen Collected"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="typeOfSpecimenCollected"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Blood', value: 'blood' },
                      { label: 'Serum', value: 'serum' },
                      { label: 'Nasopharyngeal swab', value: 'nasopharyngealSwab' },
                    ]
                  }
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Date Specimen Sent to Laboratory"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateSpecimenSentToLaboratory"
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
                label="Name of Testing Laboratory"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="nameOfTestingLaboratory"
                rules={[
                  {
                    required: true,
                    message: "Select a laboratory!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={nameOfTestingLaboratory}
                >
                  {nameOfTestingLaboratory.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
          <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Specimen Received"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="sampleReceived"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Blood', value: 'blood' },
                      { label: 'Serum', value: 'serum' },
                      { label: 'Nasopharyngeal swab', value: 'nasopharyngealSwab' },
                    ]
                  }
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Date Specimen Received in the Laboratory"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateSpecimenReceivedInLaboratory"
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

            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Type of Test Conducted"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="typeOfTestConducted"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'ELISA (IgM)', value: 'elisaIgM' },
                      { label: 'PCR', value: 'pcr' },
                    ]
                  }
                />
              </Form.Item>
            </Col>

          </Row>

          <Row>
          <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Specimen Condition"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="specimenCondition"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="adequate">Adequate</Radio.Button>
                  <Radio.Button value="notAdequate">Not Adequate</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Measles IgM Result"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="measlesIgmResult"
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
                  <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="notDone">Not Done</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Date Result Available"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateResultAvaialable"
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
                label="Date Result Sent Out"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
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

          <Row>
          <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Specimen Condition"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="specimenCondition"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="adequate">Adequate</Radio.Button>
                  <Radio.Button value="notAdequate">Not Adequate</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Rubella IgM Result"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="rubellaIgmResult"
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
                  <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="notDone">Not Done</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Date Result Available"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateResultAvaialable"
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
                label="Date Result Sent Out"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
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

          <Row>
          <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="Specimen Condition"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="specimenCondition"
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="adequate">Adequate</Radio.Button>
                  <Radio.Button value="notAdequate">Not Adequate</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                label="PCR Result"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="pcrResult"
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
                  <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="notDone">Not Done</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Date Result Available"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateResultAvaialable"
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
                label="Date Result Sent Out"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
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
