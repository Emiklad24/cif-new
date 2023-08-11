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

const {Option} = Select;

const stateData = ['FCT', 'Enugu'];
const closeContact = ['Yes', 'No'];
const placeStayed = ['Yes', 'No'];
const associated = ['Yes', 'No'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const Epidemiological = () => {
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

  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>
            
            
            <Col lg={12} md={6} xs={24}>
              <Form.Item
                label="Duration of illness(weeks)"
                name="duration" 
                labelCol={{span: 12}}
                wrapperCol={{span: 12}}
              >
                <Input
                  placeholder="Duration of illness(weeks)"
                  id="duration"
                  name="duration"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={6} xs={24}>
              <Form.Item
                label="Previous treatments(if any)"
                name="previous_treatments" 
                labelCol={{span: 12}}
                wrapperCol={{span: 12}}
              >
                <Input
                  placeholder="Previous treatments(if any)"
                  id="previous_treatments"
                  name="previous_treatments"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={6} xs={24}>
              <Form.Item
                label="Travel History"
                name="history" 
                labelCol={{span: 12}}
                wrapperCol={{span: 12}}
              >
                <Input
                  placeholder="Travel History"
                  id="history"
                  name="history"
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
export default Epidemiological;
