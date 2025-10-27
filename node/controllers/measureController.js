const model = require("../models/measureModel");

//Retorna os dados em JSON das medições nas ultimas 12 horas
exports.getTemperatures = async (req, res) => {
    try {
        const data = await model.getTemperatures();
        res.status(200).json({
            status: "Success",
            message: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            status: "Error",
            message: "Internal server error"
        });
    }
} 

//Retorna a página web com a "Dashboard"
exports.getDataPage = (req, res) => {
    res.render("index");
}

//Recebe os dados da medição com POST e após tratar encaminha ao model
exports.postData = async (req, res) => {
    const {sensor_name, unit, value} = req.body;
    if(!sensor_name || !unit|| !value) {
        return res.status(400).json ({
            status: "Error",
            message: "Missing Params"
        });
    } else {
        try {
            const sendToDatabase = await model.saveTemperature(sensor_name, unit, value);
            if(sendToDatabase) {
                return res.status(201).json ({
                    status: "Success",
                    message: "Values saved into database!"
                }); 
            } else {
                return res.status(400).json ({
                    status: "Error",
                    message: "Values not saved"
                });
            }          
        } catch (error) {
            console.log(error);
            return res.status(500).json ({
                status: "Error",
                message: "Internal server error"
            });
        }
    }
}