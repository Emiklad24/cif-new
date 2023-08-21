/**
 * @function generateContent
 * @param Object
 */

export const generateContent = (record) => {
  const el = document.getElementById(record.id).innerHTML;
  return `
    <html>
      <body style="text-align: center;margin-top: 0.5rem">
        <div style="margin-top: 0.5rem; margin-bottom:0.5rem">
          <br />
            ${record.client.first_name} ${
              record.client.surname
            } sample received at: ${new Date(
              record?.date_of_collection_of_first_sample || record?.date_sample_received
            ).toLocaleDateString() || "N/A"}
          <br />
          ${el}
        </div>
      </body>
    </html>
  `;
};

// =======================================================

/**
 * @function onPrintBarCode
 * @param Object
 * @description open the browser native print modal to print a barcode for a sample
 */
export const onPrintBarCode = (record) => {
  const printSection = window.open("", "", "height=500, width=500");
  const content = generateContent(record);
  printSection.document.write(content);
  printSection.document.close();
  printSection.print();
};

// =======================================================

/**
 * @function onPrintMultipleBarcode
 * @param Array
 * @description open the browser native print modal to print multiple barcode for all selected sample
 */

export const onPrintMultipleBarcode = ({records, sampleData}) => {
  const printSection = window.open("", "", "height=500, width=500");
  let content = "";
  records.forEach((record) => {
    const record_obj = sampleData.find((el) => el.id === record);
    content += generateContent(record_obj);
  });
  printSection.document.write(content);
  printSection.document.close();
  printSection.print();
};

// =======================================================

/**
 * @function generateBarCode
 * @description generate a single code for a samples
 */
export const generateBarCode = (arg1, arg2, arg3, count = 1) => {
  const facilityCode = (arg1.length < 3) ? arg1.toUpperCase() : arg1.slice(0, 3).toUpperCase();
  const departmentCode = (arg2.length < 3) ? arg2.toUpperCase() : arg2.slice(0, 3).toUpperCase();
  const year = new Date().getFullYear();

  if (count === 1) {
  return `${facilityCode}/${departmentCode}/${year}/${arg3}`;
  }
  if (count <= 1){
    return;
  }
  // generate an the number of barcode specified and return an array
  const barCodes = [];
  for (let i = 0; i < count; i++) {
    barCodes.push(`${facilityCode}/${departmentCode}/${arg3}/${year}/${i+1}`);
  }
  return barCodes;
};

// =======================================================

/**
 * @function generateMultipleBarCode
 * @description generate multiple codes for all selected samples
 */

export const generateMultipleBarCode = (arg1, arg2, arg3, count = 0) => {
  const facilityCode = (arg1.length < 3) ? arg1.toUpperCase() : arg1.slice(0, 3).toUpperCase();
  const departmentCode = (arg2.length < 3) ? arg2.toUpperCase() : arg2.slice(0, 3).toUpperCase();
  const year = new Date().getFullYear();

  if (count > 0){
    // generate an the number of barcode specified and return an array
    const barCodes = [];
    for (let i = 0; i < count; i++) {
      barCodes.push(`${facilityCode}/${departmentCode}/${arg3}/${year}/${i+1}`);
    }
    return barCodes;
  }
};

// =======================================================
