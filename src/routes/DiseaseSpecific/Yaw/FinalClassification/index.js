import {
    Col,
    Collapse,
    Form,
    Select
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";

const {Option} = Select;

const classifications = ['Suspected Case', 'Confirmed Case', 'Not a Yaws Case'];
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
          <Col lg={12} md={6} xs={24}>
              <Form.Item
                label="Final Classification"
                labelCol={{span: 12}}
                wrapperCol={{span: 12}}
                name="finalClassification"
                rules={[
                  {
                    required: true,
                    message: "Please select the Final Classification"
                  },
                ]}
                >
                <Select
                  placeholder="Select Option"
                  allowClear

                >
                  {classifications.map((item) => (
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
