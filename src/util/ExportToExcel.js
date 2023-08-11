import { Excel } from "antd-table-saveas-excel";

const columns = [
  {
    title: "EPID NUMBER",
    dataIndex: "lab_number",
    key: "lab_number",
  },
  {
    title: "LAST NAME",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "GENDER",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "TEST TYPE",
    dataIndex: "test_type_name",
    key: "test_type_name",
  },
  {
    title: "STATUS",
    dataIndex: "test_order_status_name",
    key: "test_order_status_name",
  },
  {
    title: "DATE SAMPLE COLLECTED",
    dataIndex: "date_sample_collected",
    key: "date_sample_collected",
  },
];

const exportToExcel = (data, program = "", headers = columns) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const excel = new Excel();

  excel
    .addSheet(`${month}-${year}`)
    .addColumns(headers)
    .addDataSource(data, {
      str2Percent: true,
    })
    .saveAs(`${program}-sample-list-${month}-${year}.xlsx`);
};

export default exportToExcel;
