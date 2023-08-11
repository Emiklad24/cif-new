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

const CheckboxGroup = Checkbox.Group

const { Option } = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
  <Col lg={12} md={12} sm={24}>
    <Form.Item
      label="Laboratory"
      name="listLab"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <Input
        placeholder="Laboratory"
        id="listLab"
        name="listLab"
        onChange={(e) => {
        }}
      />
    </Form.Item>
  </Col>
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
                label="Samples Collected? "
                name="samplesCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio value="yes" name="samples_collected">Yes</Radio>
                  <Radio value="no" name="samples_collected">No</Radio>
                </Radio.Group>
              </Form.Item>

            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item buttonStyle="solid"
                label="Date respiratory sample collected"
                name="dateRespiratorySampleCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Date date"
                  id="dateRespiratorySampleCollected"
                  name="dateRespiratorySampleCollected"
                  type='date'
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="What type of respiratory sample was collected??"
                name="sampleType"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Checkbox.Group buttonStyle="solid"
                  options={

                    [
                      { label: 'Nasal swab ', value: 'nasalswab' },
                      { label: 'Throat swab ', value: 'throatswab' },
                      { label: 'Nasopharyngeal swab ', value: 'nasopharyngealswab' },
                    ]
                  }

                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Sample Recieved"
                name="sampleRecieved"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Checkbox.Group buttonStyle="solid"
                  options={

                    [
                      { label: 'Nasal swab ', value: 'nasalswab' },
                      { label: 'Throat swab ', value: 'throatswab' },
                      { label: 'Nasopharyngeal swab ', value: 'nasopharyngealswab' },
                    ]
                  }

                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Other samples collected? "
                name="otherSamples"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio value="yes" name="otherSamples">Yes</Radio>
                  <Radio value="no" name="otherSamples">No</Radio>
                  <Radio value="unknown" name="otherSamples">Unknown</Radio>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Has baseline serum been taken?"
                name="baselineSerum"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid" >
                  <Radio value="yes" name="baselineSerum">Yes</Radio>
                  <Radio value="no" name="baselineSerum">No</Radio>
                  <Radio value="unknown" name="baselineSerum">Unknown</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Sample condition"
                name="sampleCondition"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid" >
                  <Radio value="Adequate" name="sampleCondition">Adequate</Radio>
                  <Radio value="Not Adequate" name="sampleCondition">Inadequate</Radio>

                </Radio.Group>
              </Form.Item>


            </Col>

            <Col lg={12} md={12} sm={12}>
              <Form.Item
                label="Date sample sent"
                name="dateSent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Date date"
                  id="dateSent"
                  name="dateSent"
                  type='date'
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item buttonStyle="solid"
                label="Date Sample Recieved"
                name="dateSampleRecieved"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Date date"
                  id="dateSampleRecieved"
                  name="dateSampleRecieved"
                  type='date'
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="RDT Result"
                name="rdtesult"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid" >
                  <Radio value="Positive" name="rdtesult">Positive</Radio>
                  <Radio value="Negative" name="rdtesult">Negative</Radio>
                  <Radio value="pending" name="rdtesult">pending</Radio>
                </Radio.Group>
              </Form.Item>



            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="PCR Result"
                name="pcrResult"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid" >
                  <Radio value="Positive" name="pcrResult">Positive</Radio>
                  <Radio value="Negative" name="pcrResult">Negative</Radio>
                  <Radio value="pending" name="pcrResult">pending</Radio>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Genomic Sequencing"
                name="genoSequencing"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid" >
                  <Radio value="B.1.1.7" name="genoSequencing">B.1.1.7</Radio>
                  <Radio value="B.1.351" name="genoSequencing">B.1.351</Radio>
                  <Radio value="P.1" name="genoSequencing">P.1</Radio>
                  <Radio value="B.1.617.2" name="genoSequencing">B.1.617.2</Radio>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item buttonStyle="solid"
                label="Date Result Available"
                name="resultAvailable"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Date date"
                  id="resultAvailable"
                  name="resultAvailable"
                  type='date'
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item buttonStyle="solid"
                label="Date Result Sent"
                name="resultSent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Date date"
                  id="resultSent"
                  name="resultSent"
                  type='date'
                  onChange={(e) => {
                  }}
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
