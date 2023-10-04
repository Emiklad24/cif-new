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

const finals = ['Lab confirmed Anthrax',
  'Epidemiologically linked Anthrax',
  'Clinically compatible Anthrax',
  'Discarded',
  'Pending classification'];
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
                  label="Select the final classification of this case:"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                  name="finalClassification"
                  rules={[
                    {
                      required: true,
                      message: "Please select",
                    },
                  ]}
                  >
                  <Select
                    placeholder="Select Option"
                    allowClear
                    name="finalClassification"
                  >
                    {finals.map((item) => (
                      <Option label={item} value={item}>
                        {item}
                      </Option>
                    ))}

                  </Select>
                 
                </Form.Item>
            </Col>
        </Panel>
      </Collapse>
    </>
  );
};
export default FinalClassification;
