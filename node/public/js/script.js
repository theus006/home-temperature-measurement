//função que requisita os dados para a API 
async function getTemperatures() {
    try {
        const getData = await fetch("/data/temperatures");
        const data = await getData.json();
        return data.data;
    } catch (error) {
        document.getElementById("chart").innerHTML = "<p>Servidor não encontrado...</p>";
    }   
}

//constroi o gráfico após os dados serem recebidos 
//e transformados em objetos
getTemperatures().then((apiData) => {
    console.log(apiData);
    if(apiData.length > 0) {
        const values = [];
        const times = [];
        apiData.forEach(d => {
            values.push(d.value);
            times.push(d.time);
        });
        const data = [{
            x:times,
            y:values,
            type:"bar",
            orientation:"v",
            marker: {color:"#2c3e50"}
        }];
        const layout = {
            title:`Medições de Temperatura: ${apiData[0].sensor_name}`,
            xaxis: {
                title: {
                    text: 'Data/Hora',
                    font: {
                        family: "Poppins sans-serif"
                    }
                },
            },
            yaxis: {
                title: {
                    text: 'Temperatura (°C)',
                    font: {
                        family: "Poppins sans-serif"
                    }
                },
            }
        };
        Plotly.newPlot("chart", data, layout);
        document.getElementById("max-value").innerHTML += ` ${Math.max(...values)} °C`;
        document.getElementById("min-value").innerHTML += ` ${Math.min(...values)} °C`;
    } else {
        document.getElementById("chart").innerHTML = "<p>Não há dados para serem exibidos.</p>";
    }
});