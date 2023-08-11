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
          <Col lg={24} md={24} sm={12} xs={24}>
              <Form.Item
                label="Final Classification"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="finalClassification"
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="laboratoryConfirmed">Laboratory Confirmed</Radio.Button>
                  <Radio.Button value="epidemiologicallyLinked">Epidemiologically Linked</Radio.Button>
                  <Radio.Button value="clinicallyCompatible">Clinically Compatible</Radio.Button>
                  <Radio.Button value="discardedNotACase">Discarded/Not a Case</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
        </Panel>
      </Collapse>
    </>
  );
};
export default FinalClassification;
