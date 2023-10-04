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

const ClinicalHistory = () => {
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

    const [formValues, setFormValues] = useState({});

    const handleUpdateInputValues = (inputName, value) => {

        console.log(inputName, value)

        setFormValues((previousState) => ({
            ...previousState,
            [inputName]: value

        }))

    }

    console.log('form values', formValues)

    return (
        <>
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="Clinical history: Sign and Symptoms" key="1">
                    <Row>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Fever"
                                name="fever"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}
                            >
                                <Radio.Group buttonStyle="solid" onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)} name="fever">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        {

formValues?.fever === "yes"  &&
  (
<>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Date Of Fever Onset"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                // initialValue={feveronset_date ? moment(feveronset_date) : null}
                                name="dateFeverOnset"
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

                                    name="dateFeverOnset"
                                    onChange={(_, dateString) => handleUpdateInputValues("dateFeverOnset", dateString)}
                                />
                            </Form.Item>
                        </Col>

                        </>
                ) 

       }

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Cough?"
                                name="cough"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Difficulty Breathing?"
                                name="difficultyBreathing"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Chest Indrawing?"
                                name="chestIndrawing"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Chest Pain"
                                name="chestPain"
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

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Sore Throat?"
                                name="soreThroat"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Vomiting or Nausea?"
                                name="vomitingNausea"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Diarrhea"
                                name="diarrhea"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                            >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24}>
                            <Form.Item
                                label="Others: (specify)"
                                name="otherSpecify"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    placeholder="Enter other symptoms"
                                    onChange={(e) => {
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Date Of Symptom Onset"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                // initialValue={symptom_date ? moment(symptom_date) : null}
                                name="dateOfOnset"
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
                    </Row>
                    <Row>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Patient vaccinated against Flu?"
                                name="patient_vaccine_flu"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                            >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Currently taking antiviral medicine?"
                                name="patient_take_antiviral"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                            >
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
export default ClinicalHistory;
