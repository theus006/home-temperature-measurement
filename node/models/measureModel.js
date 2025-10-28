const db = require("../config/db");

//Retorna as leituras feitas
exports.getTemperatures = async (start_date, end_date) => {
    //aceita os parâmetros ?start_date='data inical'&end_date='data final' 
    //para filtrar as medições por um intervalo de datas (AAAA-MM-DD)
    if(!start_date && !end_date) { 
        //caso não informe o intervalo, serão retornadas as medições das ultimas 12 horas
        try {
            let sql = "SELECT id, sensor_name, CONVERT_TZ(time, '+00:00', '-03:00') AS time, unit, ";
            sql += "value FROM measures WHERE time >= NOW() - INTERVAL 12 HOUR";
            const data = await db.dbQuery(sql);
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    } else {
        try {
            let sql = "SELECT id, sensor_name, time, unit, ";
            sql += "value FROM measures WHERE time BETWEEN ? AND ?";
            // Completa as datas recebidas com horários para o BETWEEN 
            //(o campo timestamp exige data e horário)
            const params = [
                `${start_date} 00:00:00`,
                `${end_date} 23:59:59`
            ];
            const data = await db.dbQuery(sql, params);
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
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