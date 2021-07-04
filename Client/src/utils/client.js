const axios = require("axios");
const config = require('../config/config');

var axiosInstance = axios.create({
  baseURL: config.BACKEND_SERVER,
});

module.exports = axiosInstance;