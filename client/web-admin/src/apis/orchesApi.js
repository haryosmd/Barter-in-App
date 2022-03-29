const axios = require("axios");

const instance = axios.create({
  baseURL: "https://orchestrator-barterin.herokuapp.com/",
});

module.exports = instance;
