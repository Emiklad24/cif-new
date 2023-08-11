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
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const FinalClassification = () => {
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
        <Panel header="Final Classification" key="1">

        <Col lg={12} md={12} sm={24}>
  <Form.Item
    label="What is the final classification of the case?"
    name="finalClassification"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
    rules={[
      {
        required: true,
        message: "Make a selection!",
      },
    ]}
  >

    <Radio.Group buttonStyle="solid">
      <Radio.Button value="suspect">Suspect</Radio.Button>
      <Radio.Button value="confirmed">Confirmed</Radio.Button>
      <Radio.Button value="presumptive positive">Presumptive positive</Radio.Button>
      <Radio.Button value="discarded">Discarded</Radio.Button>
    </Radio.Group>
  </Form.Item>
</Col>

        </Panel>
      </Collapse>
    </>
  );
};
export default FinalClassification;
