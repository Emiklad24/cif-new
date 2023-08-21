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
          <Col lg={6} md={6} sm={24}>
              <Form.Item
                label="Complete Address"
                name="clientaddress"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
              >
                <Input
                  placeholder="Enter Address"
                  id="address"
                  name="address"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
          <Col lg={6} md={6} sm={12} xs={24}>
              <Form.Item
                label="Type"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                name="facility_type"
                rules={[
                  {
                    required: true,
                    message: "Please input the facility Type!",
                  },
                ]}
              >
                <Select
                  placeholder="Select Facility Type"
                  allowClear

                >
                  {facilityData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>


    </>
  );
};
export default Epidemiological;
