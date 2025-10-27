const express = require("express");
const route = express.Router();
const controller = require("../controllers/measureController");

route.get("/", controller.getDataPage); //endpoint para receber a página web
//endpoints para enviar ou receber os dados em JSON:
route.get("/data/temperatures", controller.getTemperatures);
route.post("/data/temperatures", controller.postData);

module.exports = route;