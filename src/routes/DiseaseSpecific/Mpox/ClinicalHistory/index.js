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

    return (
        <>
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                <Panel header="Clinical history: Sign and Symptoms" key="1">
                    <Row>                       

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Fever (≥38 °C)"
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
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="yes">Yes</Radio.Button>
                                    <Radio.Button value="no">No</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Date Of Fever Onset"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                // initialValue={feveronset_date ? moment(feveronset_date) : null}
                                name="dateOfFeverOnset"
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

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Present of Lesions?"
                                name="presentOfLesion"
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
                                label="Are the lesions in the same state of development on the body?"
                                name="lesionSameStateOnTheBody"
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
                                label="Are all of the lesions the same size?"
                                name="leslesionSameSize"
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
                                label="Are the lesions deep and profound?"
                                name="lesionDeepAndProfound"
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

                        <Col lg={16} md={16} sm={24}>
                            <Form.Item
                                label="Localisation of the lesions?"
                                name="localisationOfLesions"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                            >
                                <CheckboxGroup
                                    options={
                                        [
                                            { label: 'Face', value: 'face' },
                                            { label: 'Leg', value: 'leg' },
                                            { label: 'Soles of the Feet', value: 'soles of the feet' },
                                            { label: 'Palms of the Hands', value: 'palms of the hands' },
                                            { label: 'Thorax', value: 'thorax' },
                                            { label: 'Arms', value: 'arms' },
                                            { label: 'Genitals', value: 'genitals' },
                                            { label: 'All over the Body', value: 'All over the body' },
                                        ]
                                    }
                                    name="localisationOfLesions"
                                />
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Red eyes (Conjunctivities)"
                                name="redEyes"
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
                                label="Sensitivity to Light"
                                name="sensitivityToLight"
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
                                label="Vomitting or Nausea"
                                name="vomittingNausea"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an Option!",
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
                                label="Cough"
                                name="cough"
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
                                label="Oral Ulcer"
                                name="oralUlcer"
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
                                label="Lymphadenopathy"
                                name="lymphadenopathy"
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
                                label="Sore Throat"
                                name="soreThroat"
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
                                label="Muscle Pain"
                                name="musclePain"
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
                                label="Headache"
                                name="headache"
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
                                label="Chills or Sweats"
                                name="chillsOrSweats"
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
                                label="Fatigue"
                                name="fatigue"
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
                                label="Pruritus"
                                name="pruritus"
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
                                label="Pregnancy status"
                                name="pregnancyStatus"
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
                                label="Skin Ulcer"
                                name="skinUlcer"
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
                                label="HIV AIDS Status"
                                name="hivAidsStatus"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                            >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="positive">Positive</Radio.Button>
                                    <Radio.Button value="negative">Negative</Radio.Button>
                                    <Radio.Button value="unknown">Unknown</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24}>
                            <Form.Item
                                label="Other Symptoms(s): (specify)"
                                name="otherSymptom"
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
                                label="Outcome"
                                name="outcome"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[
                                    {
                                        required: true,
                                        message: "Select an option!",
                                    },
                                ]}                            >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="alive">Alive</Radio.Button>
                                    <Radio.Button value="dead">Dead</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col lg={8} md={8} sm={24}>
                            <Form.Item
                                label="Date Of Symptom Onset"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                // initialValue={symptom_date ? moment(symptom_date) : null}
                                name="date_of_onset"
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
                </Panel>
            </Collapse>
        </>
    );
};
export default ClinicalHistory;
