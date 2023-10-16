import { Col, Input, Collapse, Row, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";

const Epidemiological = ({ form }) => {
  const [formValues, setFormValues] = useState({});
  const { Panel } = Collapse;

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Epidemiological Information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Vaccination status"
              name="vaccinationStatus"
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
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="vaccinationStatus"
              >
                <Radio.Button value="vaccinated">Vaccinated</Radio.Button>
                <Radio.Button value="notVaccinated">
                  Not vaccinated
                </Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          {formValues?.vaccinationStatus === "vaccinated" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Number of vaccine doses"
                name="numberOfVaccineDose"
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
                  <Radio.Button value="1">1</Radio.Button>
                  <Radio.Button value="2+">2+</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.vaccinationStatus === "vaccinated" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Date of vaccination:"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={birth_date ? moment(birth_date) : null}
                name="dateOfVaccination"
                rules={[
                  {
                    required: true,
                    message: "Input the date!",
                  },
                ]}
              >
                <CustomDatePicker form={form} name="dateOfVaccination" />
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.vaccinationStatus === "vaccinated" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Source of vaccination history"
                name="sourceVaccinationHistory"
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
                  <Radio.Button value="card">Vaccine card</Radio.Button>
                  <Radio.Button value="verbal">Verbal</Radio.Button>
                </Radio.Group>
              </ClearableFormItem>
            </Col>
          )}
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="List names of villages, towns or LGAs that patient visited in the last 3 weeks"
              name="travelHistory"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input
                placeholder="Enter travel history"
                id="address"
                name="address"
                onChange={(e) => {}}
              />
            </ClearableFormItem>
          </Col>

          <Col lg={24} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Have cases of fever and jaundice been seen or reported in places visited by the patient in the last 2 weeks
                before onset of symptoms?"
              name="locationHistoryOfFever"
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
                <Radio.Button value="yes">Yes</Radio.Button>
                <Radio.Button value="no">No</Radio.Button>
                <Radio.Button value="unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>

          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Patient present condition"
              name="patientPresentCondition"
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
                <Radio.Button value="Alive">Alive</Radio.Button>
                <Radio.Button value="Dead">Dead</Radio.Button>
                <Radio.Button value="Unknown">Unknown</Radio.Button>
              </Radio.Group>
            </ClearableFormItem>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
};
export default Epidemiological;
