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

const close = ['Yes', 'No','Unknown'];
const associated = ['Yes', 'No','Unknown'];
const place = ['Yes', 'No','Unknown'];


const Epidemiological = () => {
  const [form] = Form.useForm();
  //const [lga, setLga] = useState([]);
  const { Panel } = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  // const handleStateChange = (value) => {
  //   setLga(lgaData[value]);
  // };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const [formValues, setFormValues] = useState({});

  

  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Epidemiological Information" key="1">
          <Row>
            
            <Col lg={12} md={12} sm={24}>
                <Form.Item
                    label="Close contact with suspected or confirmed case?"
                    name="closeContact"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}>
                    <Radio.Group buttonStyle="solid">
                      {close.map((item) => (
                        <Radio.Button value={item}>{item}</Radio.Button>
                      ))}
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Travel history in the last 10-14 months"
                name="travelHistory" 
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
              >
                <Input
                  placeholder="Enter Travel history"
                  id="travelHistory"
                  name="travelHistory"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>
           
            <Col lg={12} md={12} sm={24}>
                <Form.Item
                    label="Place stayed in the last 10-14 months if not same as above"
                    name="placeStayedInTheLast1014Months"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}>
                    <Radio.Group buttonStyle="solid">
                      {place.map((item) => (
                          <Radio.Button value={item}>{item}</Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24}>
                <Form.Item
                    label="Associated with an outbreak"
                    name="associatedWithAnOutbreak"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}>
                    <Radio.Group buttonStyle="solid">
                      {associated.map((item) => (
                          <Radio.Button value={item}>{item}</Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>


    </>
  );
};
export default Epidemiological;
