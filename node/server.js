const express = require("express");
const app = express();
const routes = require("./routes/measureRoutes");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("./public"));
app.use("/", routes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});