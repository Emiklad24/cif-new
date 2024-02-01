import {
    Checkbox,
    Col,
    Collapse,
    Form,
    Radio,
    Row,
    Select
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";

const CheckboxGroup = Checkbox.Group;

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
        <Row>

        <Col lg={24} md={12} sm={24}>
              <Form.Item
                label="Final Classification"
                name="finalClassification"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="confirmed">Confirmed</Radio.Button>
                  <Radio.Button value="notacase">Not a Case</Radio.Button>
                  <Radio.Button value="probable">Probable</Radio.Button>
                  <Radio.Button value="pending">Pending</Radio.Button>
                  <Radio.Button value="not_done">Not Done</Radio.Button>




                </Radio.Group>
              </Form.Item>
            </Col>

            </Row>
        </Panel>
      </Collapse>
    </>
  );
};
export default FinalClassification;
