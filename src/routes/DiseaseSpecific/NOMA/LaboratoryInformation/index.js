import {
  Col,
  Form,
  Input,
  Collapse, DatePicker,
  Row, Tooltip,
  Select, Radio,
} from 'antd';
import React, { useState } from 'react';
import "styles/pages/form.less";
import moment from "moment";
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];

const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
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
  const laboratoryOptions = ["NRL GADUWA", "CPHL"]
  const conditionOfSampleOptions = ["Adequate", "Not adequate"];

  const [formValues, setFormValues] = useState({});

  const handleUpdateInputValues = (inputName, value) => {

    setFormValues((previousState) => ({
      ...previousState,	
      [inputName]: value

    }))

  }
 
  
  return (
    <>
      <Collapse defaultActiveKey={['1']} onChange={onChange}>
        <Panel header="Laboratory information" key="1">
          <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen Collected"
                name="specimenCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={specimenCollected ? moment(specimenCollected) : null}
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" name="specimenCollected" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}>
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>







          {

            formValues?.specimenCollected === "yes" && (


              <Row>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Type of Specimen Collected"
                name="typeOfSpecimenCollected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={typeOfSpecimenCollected ? moment(typeOfSpecimenCollected) : null}

                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <CheckboxGroup
                  options={

                    [
                      { label: 'Oral Swab', value: 'face' },
                      { label: 'Nasal Swab', value: 'leg' },
                      { label: 'Nasopharyngeal Swab', value: 'head' },


                    ]
                  }
                  name="sampleType"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen Collected"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={dateSpecimenCollected ? moment(dateSpecimenCollected) : null}
                name="dateSpecimenCollected"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Date Specimen Sent"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={dateSpecimenSent ? moment(dateSpecimenSent) : null}
                name="dateSpecimenSent"
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <DatePicker
                  format="DD-MM-YYYY"
                  // onChange={onChangeDoB}
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{ width: "100%" }}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Name of Testing Laboratory"
                name="nameOfTestingLaboratory"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  placeholder="Select Laboratory Name"
                  allowClear
                  id="nameOfTestingLaboratory"
                  name="nameOfTestingLaboratory"
                  onSelect={(e) => {
                  }}
                >
                  {laboratoryOptions.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
           
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label="Specimen Recieved"
                name="specimenRecieved"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={specimenRecieved ? moment(specimenRecieved) : null}
                rules={[
                  {
                    required: true,
                    message: "Please input the date!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" name="specimenRecieved" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}>
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
            )
          }
  {

formValues?.specimenRecieved === "yes" && (


  <Row>

<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Type of Specimen Recieved"
    name="specimenType"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    // initialValue={typeOfSpecimenRecieved ? moment(typeOfSpecimenRecieved) : null}

    rules={[
      {
        required: true,
        message: "Please input the date!",
      },
    ]}
  >
    <CheckboxGroup
      options={

        [
          { label: 'Oral Swab', value: 'face' },
          { label: 'Nasal Swab', value: 'leg' },
          { label: 'Nasopharyngeal Swab', value: 'head' },


        ]
      }
      name="sampleType"
    />
  </Form.Item>
</Col>

<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Date Specimen Recieved"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    // initialValue={dateSpecimenRecieved ? moment(dateSpecimenRecieved) : null}
    name="dateSpecimenRecieved"
    rules={[
      {
        required: true,
        message: "Please input the date!",
      },
    ]}
  >
    <DatePicker
      format="DD-MM-YYYY"
      // onChange={onChangeDoB}
      disabledDate={(current) =>
        current.isAfter(moment()) || isDatePickerDisabled
      }
      style={{ width: "100%" }}
      placeholder="DD-MM-YYYY"
    />
  </Form.Item>
</Col>

<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Specimen Condition"
    name="specimenCondition"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    // initialValue={specimenCondition ? moment(specimenCondition) : null}

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
      id="conditionOfSample"
      name="conditionOfSample"
      onSelect={(e) => {
      }}
    >
      {conditionOfSampleOptions.map((item) => (
        <Option label={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  </Form.Item>
</Col>
</Row>
)
}

        </Panel>
      </Collapse>
    </>
  );
};
export default LaboratoryInformation;
