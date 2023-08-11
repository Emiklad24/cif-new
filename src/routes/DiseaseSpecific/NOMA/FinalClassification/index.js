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
  const finalClassificationOptions = ["Lab confirmed", "Epidemiologically Link","Discarded","Pending"]
  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Final Classification" key="1">
         
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Final Classification"
                name="finalClassification"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                 // initialValue={finalClassification ? moment(finalClassification) : null}
                 name="finalClassification"
                 rules={[
                   {
                     required: true,
                     message: "Please input the date!",
                   },
                 ]}
              >
                <Select
                  placeholder="Select Lab Name"
                  allowClear
                  id="finalClassification"
                  name="finalClassification"
                  onSelect={(e) => {
                  }}
                >
                   {finalClassificationOptions.map((item) => (
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
