const express = require("express");
const app = express();
const routes = require("./routes/measureRoutes");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("./public"));
app.use("/", routes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});