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
                label="Date Of symptom onset"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={date_of_onset ? moment(date_of_onset) : null}
                name="date_of_onset"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <DatePicker
                format="DD-MM-YYYY"
                  // onChange={onChangeDoB}
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
                label="Diarrhea"
                name="diarrhea"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                  // initialValue={diarrhea ? moment(diarrhea) : null}
                  name="diarrhea"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
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
                label="Restlessness"
                name="restlessness"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                  // initialValue={restlessness ? moment(restlessness) : null}
                  name="restlessness"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
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
                label="Fever"
                name="fever"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                  // initialValue={fever ? moment(fever) : null}
                  name="fever"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
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
                label="Leg cramp"
                name="legCramp"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={legCramp ? moment(legCramp) : null}
                name="legCramp"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
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
                name="vomiting"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={vomiting ? moment(vomiting) : null}
                name="vomiting"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
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
                label="Thirst"
                name="thirst"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={thirst ? moment(thirst) : null}
                name="thirst"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
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
                 // initialValue={dehydrated ? moment(dehydrated) : null}
                 name="dehydrated"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
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
                label="Blood in stool"
                name="bloodInStool"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                  // initialValue={bloodInStool ? moment(bloodInStool) : null}
                  name="bloodInStool"
                  rules={[
                    {
                      required: true,
                      message: "Please input the date!",
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
                name="othersymptoms"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                   
              >
                <Input
                  placeholder="othersymptoms"
                  id="othersymptoms "
                  name="othersymptoms"
                  type="Text"
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
