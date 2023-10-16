/* eslint-disable no-unused-vars */
import { Col, Input, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const ClinicalHistory = ({ form }) => {
  const { Panel } = Collapse;
  const [formValues, setFormValues] = useState({});

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Fever (≥38 °C)"
              name="fever"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Jaundice"
              name="jaundice"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="General weakness"
              name="generalWeakness"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Abdominal pain"
              name="abdominalPain"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Convulsion"
              name="convulsion"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Bleeding from nose,gums,skin or gastrointestinal tract"
              name="bleedingFromBodySites"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Headache"
              name="headache"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Vomiting"
              name="vomiting"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Other symptoms, please specify"
              name="otherSymptoms"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Other symptoms"
                id="othersymptoms "
                name="otherSymptoms"
                type="Text"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={10} md={8} sm={24}>
            <ClearableFormItem
              label="Date of symptom onset"
              name="dateOfOnset"
              form={form}
              setFormValues={setFormValues}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please input the date!",
                },
              ]}
            >
              <CustomDatePicker name="dateOfOnset" form={form} />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
