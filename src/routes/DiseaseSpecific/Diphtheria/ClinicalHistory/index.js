/* eslint-disable no-unused-vars */
import { Checkbox, Col, Collapse, Input, Row } from "antd";
import ClearableFormItem from "components/Custom/ClearableFormItem";
import CustomDatePicker from "components/Custom/CustomDatePicker";
import DynamicRadio from "components/Custom/DynamicRadio";
import useFetchAllLookup from "hooks/useFetchAllLookups.hooks";
import React, { useState } from "react";
import "styles/pages/form.less";

const CheckboxGroup = Checkbox.Group;

const ClinicalHistory = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});
  const { data: allLookup } = useFetchAllLookup();
  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };
  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Clinical history: Sign and Symptoms" key="1">
        <Row>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Fever (≥38 °C)"
              name="fever"
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
              />
            </ClearableFormItem>
          </Col>

          {/* <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of fever onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfFeverOnset"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfFeverOnset" />
            </ClearableFormItem>
          </Col> */}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date seen at the health facility"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfVisitToHealthFacility"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker
                form={form}
                name="dateOfVisitToHealthFacility"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Neck swelling"
              name="neckSwelling"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Pharyngitis/Tonsilitis"
              name="pharyngitisTonsilitis"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Presence of adherent pseudo-membrane ?"
              name="presenceOfAdherentPseudoMembrane"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Location of adherent pseudo-membrane?"
              name="locationOfAdherentPseudoMembrane"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CheckboxGroup
                options={[
                  { label: "Throat", value: "throat" },
                  { label: "Pharynx", value: "pharynx" },
                  { label: "Larynx", value: "larynx" },
                ]}
                name="locationAdherentPseudoMembrane"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Laryngitis"
              name="laryngitis"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Bleeding (from orifices)"
              name="bleeding"
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
              />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Skin lesions"
              name="skinLesions"
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
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Others (Specify)"
              name="others"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input
                placeholder="Enter other symptoms"
                id="specifyOthers"
                name="specifyOthers"
                onChange={(e) => {}}
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of symptom onset"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfOnset"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfOnset" />
            </ClearableFormItem>
          </Col>
          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date health facility notified LGA"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateHealthFacilityNotifiedLga"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker
                form={form}
                name="dateHealthFacilityNotifiedLga"
              />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Date of hospitalization"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name="dateOfHospitalization"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <CustomDatePicker form={form} name="dateOfHospitalization" />
            </ClearableFormItem>
          </Col>

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Antibiotics administered"
              name="antibioticsAdministered"
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
                name="antibioticsAdministered"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.antibioticsAdministered === "YES" && (
            <>
              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name of antibiotics"
                  name="nameAntibiotics"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter name of antibiotics"
                    id="address"
                    name="antibioticsName"
                    onChange={(e) => {}}
                  />
                </ClearableFormItem>
              </Col>

              <Col lg={8} md={8} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date antibiotics was administered"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateOfFirstDose"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateOfFirstDose" />
                </ClearableFormItem>
              </Col>
            </>
          )}

          <Col lg={8} md={8} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Antitoxin administered?"
              name="antitoxinAdministered"
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
                name="antitoxinAdministered"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
              />
            </ClearableFormItem>
          </Col>

          {formValues?.antitoxinAdministered === "YES" && (
            <Col lg={8} md={8} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Date of antitoxin"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name="dateOfAntitoxin"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <CustomDatePicker form={form} name="dateOfAntitoxin" />
              </ClearableFormItem>
            </Col>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default ClinicalHistory;
