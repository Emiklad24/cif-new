import {
  Checkbox,
  Col,
  Collapse, DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from 'antd';
import moment from "moment";
import React, { useState } from 'react';
import "styles/pages/form.less";

const nameOfTestingLaboratory = ["National Refrence Laboratory (NRL)", "Central Public Health Laboratory (CPHL)"];
const CheckboxGroup = Checkbox.Group;
const {Option} = Select;

const LaboratoryInformation = ({form}) => {
  const {Panel} = Collapse;
  const [isDatePickerDisabled] = useState(false);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));

  const handleUpdateInputValues = (inputName, value) => {

    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value

    }))

  }

  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Specimen Collected?"
              name="specimenCollected"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              rules={[
                {
                  required: true,
                  message: "Select an option!",
                },
              ]}
            >


              <Radio.Group buttonStyle="solid" name="specimenCollected"
                           onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}>
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>


        {formValues?.specimenCollected === "yes" &&
          (
            <>
              <Row>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of Specimen Collection"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={symptom_date ? moment(symptom_date) : null}
                    name="dateSpecimenCollected"
                    rules={[
                      {
                        required: true,
                        message: "Select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      // onChange={onChangeDoS}
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Type of Specimen collected?"
                    name="specimenType"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}

                    rules={[
                      {
                        required: true,
                        message: "Select an Option!",
                      },
                    ]}>
                    <CheckboxGroup
                      options={

                        [
                          {label: 'Blood', value: 'blood'},
                          {label: 'Crust', value: 'crust'},
                          {label: 'Swab', value: 'swab'},

                        ]
                      }
                      name=""
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Name of Testing Laboratory"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={birth_date ? moment(birth_date) : null}
                    name="nameOfTestingLaboratory"
                    rules={[
                      {
                        required: true,
                        message: "Select an option!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      optionLabelProp="label"
                    >
                      {nameOfTestingLaboratory.map((item, i) => (
                        <Option key={i} label={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of Specimen Sent"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={symptom_date ? moment(symptom_date) : null}
                    name="dateSpecimenSent"
                    rules={[
                      {
                        required: true,
                        message: "Select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      // onChange={onChangeDoS}
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>


              <Row>


                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of Specimen Received"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={symptom_date ? moment(symptom_date) : null}
                    name="dateSpecimenReceived"
                    rules={[
                      {
                        required: true,
                        message: "Select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      // onChange={onChangeDoS}
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                      name="dateSpecimenReceived"
                      onChange={(_, dateString) => handleUpdateInputValues("dateSpecimenReceived", dateString)}
                    />
                  </Form.Item>
                </Col>
                {

                  formValues?.dateSpecimenReceived && formValues?.dateSpecimenReceived !== "" && (
                    <>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Type of Specimen Received?"
                          name="typeOfSpecmenReceived"
                          labelCol={{span: 24}}
                          wrapperCol={{span: 24}}

                          rules={[
                            {
                              required: true,
                              message: "Select an option!",
                            },
                          ]}>
                          <CheckboxGroup
                            options={

                              [
                                {label: 'Tissue Biopsy', value: 'tissueBiopsy'},
                                {label: 'Fine Needle Aspirate', value: 'fineNeedleAspirate'},
                                {label: 'Swab', value: 'swab'},

                              ]
                            }

                          />
                        </Form.Item>
                      </Col>

                      <Row>
                        <Col lg={12} md={12} sm={24}>
                          <Form.Item
                            label="Laboratory ID"
                            name="laboratoryId"
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                          >
                            <Input
                              placeholder="Enter laboratory Id"
                              onChange={(e) => {
                              }}
                            />
                          </Form.Item>
                        </Col>

                        <Col lg={12} md={12} sm={24}>
                          <Form.Item
                            label="Specimen Condition?"
                            name="specimencondition"
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            rules={[
                              {
                                required: true,
                                message: "Select an option!",
                              },
                            ]}
                          >
                            <Radio.Group buttonStyle="solid">
                              <Radio.Button value="adequate">Adequate</Radio.Button>
                              <Radio.Button value="notadequate">Not adequate</Radio.Button>
                            </Radio.Group>
                          </Form.Item>

                        </Col>
                      </Row>
                    </>
                  )


                }


                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Type of Test Conducted?"
                    name="typeOfTestConducted"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}

                    rules={[
                      {
                        required: true,
                        message: "Select an Option!",
                      },
                    ]}>
                    <CheckboxGroup
                      options={

                        [
                          {label: 'PCR', value: 'pcr'},
                          {label: 'ZN staining', value: 'znStaining'},
                          {label: 'Culture', value: 'Culture'},
                          {label: 'Histopathology', value: 'histopathology'},

                        ]}
                      name="typeOfTestConducted"
                      onChange={(value) => handleUpdateInputValues("typeOfTestConducted", value)}


                    />
                  </Form.Item>
                </Col>


                {
                  formValues?.typeOfTestConducted?.includes("pcr") && (

                    <Col lg={12} md={12} sm={24}>
                      <Form.Item
                        label="PCR Result"
                        name="pcrResult"
                        labelCol={{span: 24}}
                        wrapperCol={{span: 24}}
                        rules={[
                          {
                            required: true,
                            message: "Select an option!",
                          },
                        ]}>
                        <Radio.Group buttonStyle="solid" name="pcrResult"
                                     onChange={(e) => handleUpdateInputValues(e.target.name, e.target.value)}>
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="notdone">Not Done</Radio.Button>


                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  )

                }


                {formValues?.typeOfTestConducted?.includes("Culture") && (


                  <Col lg={12} md={12} sm={24}>
                    <Form.Item
                      label="Serology Result"
                      name="serologyResult"
                      labelCol={{span: 24}}
                      wrapperCol={{span: 24}}
                      rules={[
                        {
                          required: true,
                          message: "Select an option!",
                        },
                      ]}>
                      <Radio.Group buttonStyle="solid">
                        <Radio.Button value="positive">Positive</Radio.Button>
                        <Radio.Button value="negative">Negative</Radio.Button>
                        <Radio.Button value="indeterminate">Indeterminate</Radio.Button>
                        <Radio.Button value="pending">Pending</Radio.Button>
                        <Radio.Button value="notdone">Not Done</Radio.Button>


                      </Radio.Group>
                    </Form.Item>
                  </Col>
                )


                }


              </Row>
              <Row>


              </Row>
              <Row>


              </Row>
              <Row>


              </Row>
              <Row>


                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date of Result Available"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={tested_date ? moment(tested_date) : null}
                    name="dateResultAvailable"
                    rules={[
                      {
                        required: true,
                        message: "Select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      // onChange={onChangeDoT}
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col lg={12} md={12} sm={24}>
                  <Form.Item
                    label="Date Result sent"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    // initialValue={resultsent_date ? moment(resultsent_date) : null}
                    name="dateResultSent"
                    rules={[
                      {
                        required: true,
                        message: "Select a date!",
                      },
                    ]}
                  >
                    <DatePicker
                      // onChange={onChangeDoT}
                      disabledDate={(current) =>
                        current.isAfter(moment()) || isDatePickerDisabled
                      }
                      style={{width: "100%"}}
                      placeholder="DD-MM-YYYY"
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>


            </>


          )

        }


      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
