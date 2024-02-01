/* eslint-disable no-unused-vars */
import { Col, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import DynamicRadio from "components/Custom/DynamicRadio";

const Epidemiological = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState(form?.getFieldsValue(true));
  const { data: allLookup } = useFetchAllLookup();
  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Exposure details known"
              name="exposureDetails"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
                name="exposureDetails"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>
          {formValues?.exposureDetails === "YES" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                form={form}
                setFormValues={setFormValues}
                label=" Activity details"
                name="activityDetails"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DynamicRadio
                  buttonStyle="solid"
                  options={allLookup?.yes_no_unknown || []}
                  valueProperty="id"
                  labelProperty="value"
                />
              </ClearableFormItem>
            </Col>
          )}

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Living or working in an area with high risk of transmission"
              name="livingOrWorkingInHighRiskEnvironment"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Residing or traveled to areas with high risk"
              name="areasWithHighRisk"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Contact with source case known"
              name="contactWithSourceCase"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DynamicRadio
                buttonStyle="solid"
                options={allLookup?.yes_no_unknown || []}
                valueProperty="id"
                labelProperty="value"
              />
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
