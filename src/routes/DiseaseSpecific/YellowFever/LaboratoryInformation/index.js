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
import { Checkbox } from 'antd';

const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

const stateData = ['FCT', 'Enugu'];
const facilityData = ['Federal Medical Center', 'Jabi Clinic'];
const diseaseData = ['COVID-19', 'Cholera', 'Yellow Fever'];
const sentLaboratoryData = ['NRL, Gaduwa', 'CPHL', 'YDMH', 'UBTH', 'MAITAMA DISTRICT HOSPITAL LABORATORY', 'GOMBE SPECIALIST HOSPITAL', 'MAITAMA DISTRICT HOSPITAL LABORATORY', 'UNTH'];
const labTestData = ['Igm', 'IgG(acute)', 'IgG(convalescent)', 'Microscopy', 'PCR/RT-PCR'];
const labResultData = ['Positive', 'Negative', 'Inconclusive'];


const lgaData = {
  FCT: ['AMAC', 'Bwari', 'Kwali'],
  Enugu: ['Nsukka', 'Enugu south', 'Udi'],
};

const LaboratoryInformation = () => {
  const [form] = Form.useForm();
  const [lga, setLga] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [sentLaboratory, setPlaceOfLaboratory] = useState('');
  const [sampleCollection, setTypeOfTest] = useState('');
  const [testConducted, setTestResult] = useState('');
  const [sampleCollected,setSamplecollection] = useState('');
  const {Panel} = Collapse;
  const [isDatePickerDisabled, setIsDatePickerDisabled] = useState(false);

  const handleStateChange = (value) => {
    setLga(lgaData[value]);
  };

  const handleUpdateInputValues = (inputName, value) => {

    console.log(inputName, value)

    setFormValues((previousState) => ({
      ...previousState, 
      [inputName]: value

    }))

  }

  console.log('form values', formValues)


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
        <Panel header="Laboratory information" key="1">

        
        <Row>

<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Was sample Collected?"
    name="sampleCollected"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
    rules={[
      {
        required: true,
        message: "Make a selection!",
      },
    ]}
  >

<Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} 
                      name="sampleCollected" >
      <Radio.Button value="yes">Yes</Radio.Button>
      <Radio.Button value="no">No</Radio.Button>
      <Radio.Button value="unknown">Unknown</Radio.Button>
    </Radio.Group>
  </Form.Item>
</Col>

{formValues?.sampleCollected === "yes"  &&
<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Enter the type of sample collected"
    name="sampleCollection"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    rules={[
      {
        required: true,
        message: "Select a sample!",
      },
    ]}
  >
    <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} 
                      name="sampleCollection" >
      <Radio.Button value="blood">Blood</Radio.Button>
      <Radio.Button value="sera">Sera</Radio.Button> 
    </Radio.Group>

  </Form.Item>

</Col>
}

{formValues?.sampleCollected === "yes"  &&
<Col lg={12} md={12} sm={24}>
<Form.Item
    label="Enter the Date the Sample was collected:"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
    // initialValue={birth_date ? moment(birth_date) : null}
    name="dateOfSampleCollection"
    rules={[
      {
        required: true,
        message: "Input the date!",
      },
    ]}
  >
    <DatePicker
      // onChange={onChangeDoB}
      format="DD-MM-YYYY"
      disabledDate={(current) =>
        current.isAfter(moment()) || isDatePickerDisabled
      }
      style={{width: "100%"}}
      placeholder="DD-MM-YYYY"
    />
  </Form.Item>
</Col>
}

{formValues?.sampleCollected === "yes"  &&
<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Has collected Sample been sent to the Lab?"
    name="sampleSent"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
    rules={[
      {
        required: true,
        message: "Make a selection!",
      },
    ]}
  >

<Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} 
                      name="sampleSent" >
      <Radio.Button value="yes">Yes</Radio.Button>
      <Radio.Button value="no">No</Radio.Button>
      <Radio.Button value="unknown">Unknown</Radio.Button>
    </Radio.Group>
  </Form.Item>
</Col>
}

{formValues?.sampleSent === "yes"  &&
<Col lg={12} md={12} sm={24}>
<Form.Item
    label="Enter the Date the Sample was sent to the laboratory:"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
    // initialValue={birth_date ? moment(birth_date) : null}
    name="dateOfSampleShipment"
    rules={[
      {
        required: true,
        message: "Input the date!",
      },
    ]}
  >
    <DatePicker
      // onChange={onChangeDoB}
      format="DD-MM-YYYY"
      disabledDate={(current) =>
        current.isAfter(moment()) || isDatePickerDisabled
      }
      style={{width: "100%"}}
      placeholder="DD-MM-YYYY"
    />
  </Form.Item>
</Col>
}

{formValues?.sampleSent === "yes"  &&
<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Name of Laboratory Sample was sent to"
    name="sentLaboratory"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    rules={[
      {
        required: true,
        message: "Select this option!",
      },
    ]}
  >
     <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={setPlaceOfLaboratory}
                >
                  {sentLaboratoryData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
  </Form.Item>
</Col>
}

{formValues?.sampleSent === "yes"  &&
<Col lg={12} md={12} sm={24}>
<Form.Item
    label="Has sample been recieved at the Lab?"
    name="sampleRecieved"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
  >
    <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} 
                      name="sampleRecieved" >
      <Radio.Button value="yes">Yes</Radio.Button>
      <Radio.Button value="no">No</Radio.Button>
      <Radio.Button value="unknown">Unknown</Radio.Button>
    </Radio.Group>
  </Form.Item>
</Col>
}

{formValues?.sampleRecieved === "yes"  &&
<Col lg={12} md={12} sm={24}>
<Form.Item
    label="Enter the Date the Sample was received at the laboratory:"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
    // initialValue={birth_date ? moment(birth_date) : null}
    name="dateOfSampleRecieved"
    rules={[
      {
        required: true,
        message: "Input the date!",
      },
    ]}
  >
    <DatePicker
      // onChange={onChangeDoB}
      format="DD-MM-YYYY"
      disabledDate={(current) =>
        current.isAfter(moment()) || isDatePickerDisabled
      }
      style={{width: "100%"}}
      placeholder="DD-MM-YYYY"
    />
  </Form.Item>
</Col>
}

{formValues?.sampleRecieved === "yes"  &&
<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Sample Condition"
    name="sampleCondition"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    rules={[
      {
        required: true,
        message: "Select this option!",
      },
    ]}
  >
    <Radio.Group buttonStyle="solid">
      <Radio.Button value="Adequate">Adequate</Radio.Button>
      <Radio.Button value="Not adequate">Not adequate</Radio.Button>
    </Radio.Group>
  </Form.Item>
</Col>
}

{formValues?.sampleRecieved === "yes"  &&
<Col lg={12} md={12} sm={24}>
<Form.Item
    label="Has sample test been conducted?"
    name="sampleTest"
    labelCol={{span: 24}}
    wrapperCol={{span: 24}}
  >
    <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} 
                      name="sampleTest" >
      <Radio.Button value="yes">Yes</Radio.Button>
      <Radio.Button value="no">No</Radio.Button>
      <Radio.Button value="unknown">Unknown</Radio.Button>
    </Radio.Group>
  </Form.Item>
</Col>
}

{formValues?.sampleTest === "yes"  &&
<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Type of Test conducted"
    name="testConducted"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    rules={[
      {
        required: true,
        message: "Select this option!",
      },
    ]}
  >
     <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={setTypeOfTest}
                >
                  {labTestData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
  </Form.Item>
</Col>
}

{formValues?.sampleTest === "yes"  &&
<Col lg={12} md={12} sm={24}>
  <Form.Item
    label="Result of Test conducted"
    name="testResult"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    rules={[
      {
        required: true,
        message: "Select this option!",
      },
    ]}
  >
     <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  onChange={setTestResult}
                >
                  {labResultData.map((item) => (
                    <Option label={item} value={item}>
                      {item}
                    </Option>
                  ))}

                </Select>
  </Form.Item>
</Col>
}

{formValues?.sampleTest === "yes"  &&
<Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Enter Date result was made available:"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateOfAvailableResult"
                rules={[
                  {
                    required: true,
                    message: "Input the date!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
}

{formValues?.sampleTest === "yes"  &&
            <Col lg={12} md={12} sm={24}>
            <Form.Item
                label="Enter Date result was sent out:"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                
                name="dateResultSentOut"
                rules={[
                  {
                    required: true,
                    message: "Input the date!",
                  },
                ]}
              >
                <DatePicker
                  // onChange={onChangeDoB}
                  format="DD-MM-YYYY"
                  disabledDate={(current) =>
                    current.isAfter(moment()) || isDatePickerDisabled
                  }
                  style={{width: "100%"}}
                  placeholder="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>
}
</Row>


        </Panel>
      </Collapse>
    </>
  );
};
export default LaboratoryInformation;
