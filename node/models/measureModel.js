const db = require("../config/db");

//Retorna as leituras feitas nas ultimas 12 horas
exports.getTemperatures = async () => {
    try {
        let sql = "SELECT id, sensor_name, CONVERT_TZ(time, '+00:00', '-03:00') AS time, unit, "
        sql += "value FROM measures WHERE time >= NOW() - INTERVAL 12 HOUR"
        const data = await db.dbQuery(sql);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
    
}

//função que salva no banco de dados a medição recebida por POST
exports.saveTemperature = async (sensor_name, unit, value) => {
    try {
        let sql = "INSERT INTO measures (sensor_name, unit, value) VALUES (?, ?, ?)";
        const data = await db.dbQuery(sql, [sensor_name, unit, value]);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}