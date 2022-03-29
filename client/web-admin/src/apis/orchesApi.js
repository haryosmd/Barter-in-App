const axios = require("axios");

const instance = axios.create({
  baseURL: "https://orchestrator-barter-in.herokuapp.com/",
});

module.exports = instance;
