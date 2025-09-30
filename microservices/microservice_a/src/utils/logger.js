import config from "../utils/config.js";

const info = (...params) => {
  if (config.NODE_ENV == "development") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (config.NODE_ENV == "development") {
    console.error(...params);
  }
};

export default { info, error };
