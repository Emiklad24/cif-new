import { Col, Collapse, Form, Radio, Row } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";

const comorbidityOption = [
  { label: "Hypertension", value: "hypertension" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Respiratory diseases", value: "respiratory_diseases" },
  {
    label: "Immunocompromised conditions",
    value: "Immunocompromised conditions",
  },
  { label: "Obesity", value: "obesity" },
  { label: "Chronic kidney disease", value: "Chronic kidney disease" },
  { label: "Liver diseases", value: "Liver disease" },
  { label: "Neurological conditions", value: "Neurological conditions" },
];
const Epidemiological = () => {
  const { Panel } = Collapse;
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});
  console.log(formValues);

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
            <Form.Item
              label="Source of Drinking Water"
              name="sourceOfWater"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Please choose one!",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="sourceOfWater"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="Pipeborne">Pipeborne</Radio.Button>
                <Radio.Button value="bole hole/well">
                  bole hole/well
                </Radio.Button>
                <Radio.Button value=" river/stream"> river/stream</Radio.Button>
                <Radio.Button value=" pond/stagnant">
                  {" "}
                  pond/stagnant
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <Form.Item
              label="Any Family History Of Buruli"
              name="anyfamilyHistoryOfBuruli"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Select an option",
                },
              ]}
            >
              <Radio.Group
                buttonStyle="solid"
                name="anyfamilyHistoryOfBuruli"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              >
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col lg={12} m12 sm={24}>
            <Form.Item
              label="History Of Trauma"
              name="historyOfTrauma"
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
            </Form.Item>
          </Col>
          <Col lg={12} m12 sm={24}>
            <Form.Item
              label="Vaccination Status"
              name="vaccinationStatus"
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
                <Radio.Button value="Vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="not vaccinated">
                  Not vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24} className="gx-text-center">
            {" "}
            <label className="label_center">Comorbidity</label>
          </Col>
          {comorbidityOption.map((el, i) => (
            <Col lg={8} md={12} sm={24} id={i}>
              <Form.Item
                label={el.label}
                name={el.value}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Radio.Group buttonStyle="solid" name={el.value}>
                  <Radio.Button value="yes">Yes</Radio.Button>
                  <Radio.Button value="no">No</Radio.Button>
                  <Radio.Button value="unknown">Unknown</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          ))}

          <Col lg={12} m12 sm={24}>
            <Form.Item
              label="Closeness To Stagnant Water"
              name="closenessStagnantWater"
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
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
