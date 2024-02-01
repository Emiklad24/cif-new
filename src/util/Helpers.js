import moment from "moment";

/**
 * @function getAge
 * @param {String} '01-01-2022'
 * @return {String} '50 years'
 */
const getAge = (data) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (data?.match(regex) === null) {
    return "Invalid date format, Accepted format 'YYYY-MM-DD'";
  }
  const now = new Date();

  const currentDate = moment(now, "YYYY-MM-DD");
  const parsedDate = moment(data, "YYYY-MM-DD");
  const years = currentDate.diff(parsedDate, "years");
  const months = currentDate.diff(parsedDate, "months");
  const days = currentDate.diff(parsedDate, "days");
  if (years === 0) {
    if (months === 0) {
      return `${days} days`;
    }
    return `${months} months`;
  }
  return `${years} years`;
};

// =======================================================

/**
 * @function getAgeYearMonth
 * @param {String} '01-01-2022'
 * @return {String} '50 years'
 */
const getAgeYearMonth = (data) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (data?.match(regex) === null) {
    return "Invalid date format, Accepted format 'YYYY-MM-DD'";
  }
  const now = new Date();

  const currentDate = moment(now, "YYYY-MM-DD");
  const parsedDate = moment(data, "YYYY-MM-DD");
  const years = currentDate.diff(parsedDate, "years");
  const months = currentDate.diff(parsedDate, "months");

  if (years === 0) {
    if (months === 0) {
      return { year: 0, month: 0 };
    }
    return { year: 0, month: months };
  }
  return { year: years, month: 0 };
};

// =======================================================

/**
 * @function getDoBFromAge
 * @param {String} '1970-01-01'
 * @return {Object} {'53', '4'}
 */
const getDoBFromAge = (arg) => {
  const dob = new Date(arg);
  const today = new Date();
  let ageYear = today.getFullYear() - dob.getFullYear();
  let ageMonth = today.getMonth() - dob.getMonth();

  if (ageMonth < 0 || (ageMonth === 0 && today.getDate() < dob.getDate())) {
    ageYear--;
    ageMonth += 12;
  }

  return { ageYear, ageMonth };
};

// =======================================================

/**
 * @function convertUploadSize
 * @param {String} '1004884'
 * @return {String} '150KB'
 */
const convertUploadSize = (byte) => {
  const decimals = 2;
  if (!+byte) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(byte) / Math.log(k));
  return `${parseFloat((byte / k ** i).toFixed(dm))} ${sizes[i]}`;
};

// =======================================================

/**
 * @function NGNCurrencyFormatter
 * @param {String} '100000'
 * @return {String} '₦100,000.00'
 */
const NGNCurrencyFormatter = (arg1) => {
  // var formatter = new Intl.NumberFormat('en-NGN', {
  //   style: 'currency',
  //   currency: 'NGN',
  // })

  const value = arg1.toFixed(2).split(".");
  return (
    "₦ " +
    value[0]
      .split("")
      .reverse()
      .reduce(
        (acc, num, i, orig) =>
          num + (num !== "-" && i && !(i % 3) ? "," : "") + acc,
        ""
      ) +
    "." +
    value[1]
  );
};

// =======================================================

/**
 * @function toUpperCaseFirst
 * @param String
 */

const toUpperCaseFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// =======================================================

/**
 * @function getAgeForCalculation
 * @param {String} '01-01-2022'
 * @return {String} '50 years'
 */
const getAgeForCalculation = (data) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (data.match(regex) === null) {
    return "Invalid date format, Accepted format 'YYYY-MM-DD'";
  }
  const now = new Date();

  const currentDate = moment(now, "YYYY-MM-DD");
  const parsedDate = moment(data, "YYYY-MM-DD");
  const years = currentDate.diff(parsedDate, "years");

  return years;
};

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

const getTimeDistance = (type) => {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === "today") {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === "week") {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }
  if (type === "weekly") {
    return [moment().day(-7), moment(now)];
  }
  if (type === "monthly") {
    return [moment().day(-30), moment(now)];
  }

  if (type === "month") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, "months");
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(
        moment(
          `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`
        ).valueOf() - 1000
      ),
    ];
  }

  if (type === "year") {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
};

function parseNestedDates(data) {
  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      if (
        typeof data[key] === "string" &&
        data[key].match(/^\d{2}-\d{2}-\d{4}$/)
      ) {
        data[key] = moment(data[key], "DD-MM-YYYY");
      } else if (typeof data[key] === "object") {
        parseNestedDates(data[key]);
      }
    }
  }
}

/**
 * @function reformatToObject
 * @description This function is used to reformat the data to a plain object
 */

function flattenNestedObject(data, prefix = "") {
  const result = {};

  for (const key in data) {
    const value = data[key];

    if (Array.isArray(value)) {
      result[`${prefix}${key}`] = value; // Keep arrays intact
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenNestedObject(value, `${prefix}${key}.`));
    } else {
      result[`${prefix}${key}`] = value;
    }
  }

  return result;
}

function flattenNestedObjectAndRemoveEmpty(data) {
  const flattenedData = {};

  for (const key in data) {
    const value = data[key];

    if (Array.isArray(value)) {
      flattenedData[key] = value; // Keep arrays intact
    } else if (typeof value === "object" && value !== null) {
      if (value) {
        Object.assign(flattenedData, flattenNestedObjectAndRemoveEmpty(value));
      } else {
        flattenedData[key] = "";
      }
    } else {
      flattenedData[key] = value;
    }
  }

  return flattenedData;
}

// =======================================================

export {
  NGNCurrencyFormatter,
  convertUploadSize,
  flattenNestedObject,
  flattenNestedObjectAndRemoveEmpty,
  getAge,
  getAgeForCalculation,
  getAgeYearMonth,
  getDoBFromAge,
  getTimeDistance,
  parseNestedDates,
  toUpperCaseFirst
};

