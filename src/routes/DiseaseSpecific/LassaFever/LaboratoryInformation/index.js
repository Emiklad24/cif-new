import { Col, Input, Collapse, Row, Divider, Radio } from "antd";
import React, { useState } from "react";
import "styles/pages/form.less";
import { Checkbox } from "antd";
import ClearableFormItem from "../../../../components/Custom/ClearableFormItem";
import CustomDatePicker from "../../../../components/Custom/CustomDatePicker";
import useFetchAllLookup from "../../../../hooks/useFetchAllLookups.hooks";
import useGetHealthFacilities from "../../../../hooks/useGetHealthFacilities.hook";
import DynamicRadio from "../../../../components/Custom/DynamicRadio";
import DynamicSelect from "../../../../components/Custom/DynamicSelect";

const CheckboxGroup = Checkbox.Group;



const LaboratoryInformation = ({ form }) => {
  const { Panel } = Collapse;

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [formValues, setFormValues] = useState({});
  const { data: allLookup } = useFetchAllLookup();
  const allHealthFacilitiesQuery = useGetHealthFacilities();
  const nameOfTestingLaboratory = allHealthFacilitiesQuery?.data?.filter(
    (fac) => fac?.type?.toLowerCase() === "laboratory"
  );

  const handleUpdateInputValues = (inputName, value) => {
    setFormValues((previousState) => ({
      ...previousState,
      [inputName]: value,
    }));
  };

  return (
    <Collapse defaultActiveKey={["1"]} onChange={onChange}>
      <Panel header="Laboratory information" key="1">
        <Row>
          <Col lg={12} md={12} sm={24}>
            <ClearableFormItem
              setFormValues={setFormValues}
              form={form}
              label="Specimen collected"
              name="specimenCollected"
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
                options={allLookup?.yes_no_type || []}
                valueProperty="id"
                labelProperty="value"
                onChange={(e) =>
                  handleUpdateInputValues(e.target.name, e.target.value)
                }
                name="specimenCollected"
              />
            </ClearableFormItem>
          </Col>

          {formValues?.specimenCollected === "YES" && (
            <>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date specimen collected"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValue={collection_date ? moment(collection_date) : null}
                  name="dateSpecimenCollected"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateSpecimenCollected" />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Type of specimen collected"
                  name="specimenType"
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
                      { label: "Blood", value: "blood" },
                      { label: "Breast milk", value: "breastmilk" },
                    ]}
                    // name="specimenType"
                    onChange={(value) =>
                      handleUpdateInputValues("specimenType", value)
                    }
                  />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Name of testing laboratory"
                  name="nameOfTestingLaboratory"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <DynamicSelect
                    showSearch
                    allowClear
                    optionLabelProp="label"
                    options={nameOfTestingLaboratory}
                    valueProperty="id"
                    labelProperty="name"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  />
                </ClearableFormItem>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <ClearableFormItem
                  setFormValues={setFormValues}
                  form={form}
                  label="Date specimen sent"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="dateSpecimenSent"
                  rules={[
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ]}
                >
                  <CustomDatePicker form={form} name="dateSpecimenSent" />
                </ClearableFormItem>
              </Col>
            </>
          )}

          {formValues?.specimenCollected === "no" && (
            <Col lg={12} md={12} sm={24}>
              <ClearableFormItem
                setFormValues={setFormValues}
                form={form}
                label="Why was specimen not collected?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValue={collection_date ? moment(collection_date) : null}
                name="whySpecimenNotCollected"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter reason"
                  id="whySpecimenNotCollected"
                  name="whySpecimenNotCollected"
                  onChange={(e) => {}}
                />
              </ClearableFormItem>
            </Col>
          )}

          {formValues?.specimenCollected === "yes" && (
            <>
              <Divider plain>Laboratory result</Divider>
              {formValues?.specimenType?.includes("blood") &&
                formValues?.specimenCollected === "yes" && (
                  <Col lg={24} md={24} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Blood specimen received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="bloodSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <DynamicRadio
                        buttonStyle="solid"
                        options={allLookup?.yes_no_type || []}
                        valueProperty="id"
                        labelProperty="value"
                        name="bloodSpecimenReceived"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      />
                    </ClearableFormItem>
                  </Col>
                )}
              {formValues?.bloodSpecimenReceived === "YES" &&
                formValues?.specimenType?.includes("blood") && (
                  <>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Date specimen received"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="bloodDateSpecimenReceived"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          form={form}
                          name="bloodDateSpecimenReceived"
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Specimen condition"
                        name="bloodSpecimenCondition"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="adequate">Adequate</Radio.Button>
                          <Radio.Button value="not adequate">
                            Not adequate
                          </Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Laboratory ID"
                        name="bloodLaboratoryId"
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
                          placeholder="Enter lab ID"
                          id="labid"
                          name="labid"
                          onChange={(e) => {}}
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="PCR/RT-PCR result"
                        name="bloodPcrResult"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Radio.Group
                          buttonStyle="solid"
                          name="bloodPcrResult"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="notDone">Not done</Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>

                    {formValues?.bloodPcrResult === "notDone" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Why was test not done?"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={collection_date ? moment(collection_date) : null}
                          name="reasonbloodPcrNotDone"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter reason"
                            id="reasonbloodPcrNotDone"
                            name="reasonbloodPcrNotDone"
                            onChange={(e) => {}}
                          />
                        </ClearableFormItem>
                      </Col>
                    )}

                    {(formValues?.bloodPcrResult === "positive" ||
                      formValues?.bloodPcrResult === "negative" ||
                      formValues?.bloodPcrResult === "indeterminate") &&
                      formValues?.bloodSpecimenReceived === "yes" &&
                      formValues?.specimenType?.includes("blood") && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            setFormValues={setFormValues}
                            form={form}
                            label="Date result released"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            // initialValue={birth_date ? moment(birth_date) : null}
                            name="bloodDateResultReleased"
                            rules={[
                              {
                                required: true,
                                message: "This field is required",
                              },
                            ]}
                          >
                            <CustomDatePicker
                              form={form}
                              name="bloodDateResultReleased"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}
                  </>
                )}

              <Divider />
              {/* breastmilk Form fields */}
              {formValues?.specimenType?.includes("breastmilk") &&
                formValues?.specimenCollected === "yes" && (
                  <Col lg={24} md={24} sm={24}>
                    <ClearableFormItem
                      setFormValues={setFormValues}
                      form={form}
                      label="Breast milk specimen received"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      name="breastmilkSpecimenReceived"
                      rules={[
                        {
                          required: true,
                          message: "This field is required",
                        },
                      ]}
                    >
                      <DynamicRadio
                        buttonStyle="solid"
                        options={allLookup?.yes_no_type || []}
                        valueProperty="id"
                        labelProperty="value"
                        name="breastmilkSpecimenReceived"
                        onChange={(e) =>
                          handleUpdateInputValues(e.target.name, e.target.value)
                        }
                      />
                    </ClearableFormItem>
                  </Col>
                )}
              {formValues?.breastmilkSpecimenReceived === "YES" &&
                formValues?.specimenType?.includes("breastmilk") && (
                  <>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Date specimen received"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        name="breastmilkDateSpecimenReceived"
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <CustomDatePicker
                          form={form}
                          name="breastmilkDateSpecimenReceived"
                        />
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Specimen condition"
                        name="breastmilkSpecimenCondition"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="adequate">Adequate</Radio.Button>
                          <Radio.Button value="not adequate">
                            Not adequate
                          </Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="Laboratory ID"
                        name="breastmilkLaboratoryId"
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
                          placeholder="Enter lab ID"
                          id="breastmilkLabid"
                          name="breastmilkLabid"
                          onChange={(e) => {}}
                        />
                      </ClearableFormItem>
                    </Col>

                    <Col lg={12} md={12} sm={24}>
                      <ClearableFormItem
                        setFormValues={setFormValues}
                        form={form}
                        label="PCR/RT-PCR result"
                        name="breastmilkPcrResult"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Radio.Group
                          buttonStyle="solid"
                          name="breastmilkPcrResult"
                          onChange={(e) =>
                            handleUpdateInputValues(
                              e.target.name,
                              e.target.value
                            )
                          }
                        >
                          <Radio.Button value="positive">Positive</Radio.Button>
                          <Radio.Button value="negative">Negative</Radio.Button>
                          <Radio.Button value="indeterminate">
                            Indeterminate
                          </Radio.Button>
                          <Radio.Button value="pending">Pending</Radio.Button>
                          <Radio.Button value="notDone">Not done</Radio.Button>
                        </Radio.Group>
                      </ClearableFormItem>
                    </Col>
                    {formValues?.breastmilkPcrResult === "notDone" && (
                      <Col lg={12} md={12} sm={24}>
                        <ClearableFormItem
                          setFormValues={setFormValues}
                          form={form}
                          label="Why was test not done?"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          // initialValue={collection_date ? moment(collection_date) : null}
                          name="reasonBreatmilkPcrNotDone"
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter reason"
                            id="reasonBreatmilkPcrNotDone"
                            name="reasonBreatmilkPcrNotDone"
                            onChange={(e) => {}}
                          />
                        </ClearableFormItem>
                      </Col>
                    )}
                    {(formValues?.breastmilkPcrResult === "positive" ||
                      formValues?.breastmilkPcrResult === "negative" ||
                      formValues?.breastmilkPcrResult === "indeterminate") &&
                      formValues?.breastmilkSpecimenReceived === "yes" &&
                      formValues?.specimenType?.includes("breastmilk") && (
                        <Col lg={12} md={12} sm={24}>
                          <ClearableFormItem
                            setFormValues={setFormValues}
                            form={form}
                            label="Date result released"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            // initialValue={birth_date ? moment(birth_date) : null}
                            name="breastmilkDateResultReleased"
                            rules={[
                              {
                                required: true,
                                message: "This field is required",
                              },
                            ]}
                          >
                            <CustomDatePicker
                              form={form}
                              name="breastmilkDateResultReleased"
                            />
                          </ClearableFormItem>
                        </Col>
                      )}
                  </>
                )}
            </>
          )}
        </Row>
      </Panel>
    </Collapse>
  );
};
export default LaboratoryInformation;
