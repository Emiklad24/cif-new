import {
  Col,
  Form,
  Input,
  Collapse, DatePicker, Segmented,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
// const [value, setValue] = useState('Map');
//   return <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />;

const { Option } = Select;

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
        <Panel header="Epidemiological Information" key="1">
          <Row>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Travelled within the last 3 weeks before becoming ill?"
                name="travelledWithinLastThreeweeks"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Does the patient have a cutaneous eruption?"
                name="patientHaveCutaneousEruption"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="During onset of symptoms, did the patient have contact with one or more persons who had with similar symptoms?"
                name="patientContactWithPersonSimilarSymptoms"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Did the patient touch a domestic or wild animal during the three weeks preceding symptom onset?"
                name="patientTouchAnimals"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>

            </Col>          

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="What Kind of Animal?"
                name="kindOfAnimal"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  placeholder="Enter type of animal touched"
                  onChange={(e) => {
                  }}
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date of Animal Contact"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={symptom_date ? moment(symptom_date) : null}
                name="dateOfAnimalContact"
                rules={[
                  {
                    required: true,
                    message: "Select a date!",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={24} md={24} sm={24}>
              <Form.Item
                label="Type of contact?"
                name="typeOfContact"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Rodents alive in the House', value: 'rodents_alive_in_the_house' },
                      { label: 'Dead Animal found in the Forest', value: 'dead_animal_found_in_the_forest' },
                      { label: 'Alive Animal Living in the Forest', value: 'alive_animal_living_in_the_forest' },
                      { label: 'Animal bought for Meat', value: 'animal_bought_for_meat' },

                    ]
                  }
                  name="typeOfContact"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Is a Smallpox vaccination scar present?"
                name="smallpoxVaccineScarPresent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Select an option!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
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
