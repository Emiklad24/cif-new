/* eslint-disable no-unused-vars */
import { Col, Collapse, Row, Select, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";

const { Option } = Select;

const Epidemiological = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const occupationOptions = ["Farmer", "Business", "Trader", "Teacher"];
  const [formValues, setFormValues] = useState({});

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Family occupation"
              name="familyOccupation"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                placeholder="Select occupation"
                allowClear
                id="familyOccupation"
                name="familyOccupation"
              >
                {occupationOptions.map((item) => (
                  <Option label={item} value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Confirmed immunocompromised patient"
              name="confirmedImmunocompromisedPatient"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Vaccination status"
              name="vaccinationStatus"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notvaccinated">
                  Not vaccinated
                </Radio.Button>
                <Radio.Button value="partialvaccinated">
                  Partial vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Any family history of NOMA"
              name="anyFamilyHistoryOfNoma"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              form={form}
              setFormValues={setFormValues}
              label="Oral hygiene"
              name="oralHygiene"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="good">Good</Radio.Button>
                <Radio.Button value="fair">Fair</Radio.Button>
                <Radio.Button value="poor">Poor</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
