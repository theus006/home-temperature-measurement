//Código por Matheus Costa - 2025
//Github: https://github.com/theus006

#include <OneWire.h>
#include <DallasTemperature.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h> 
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

//configurações do sensor de temperatura
const int oneWireBus = 4;     
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

//configurações de rede e do servidor
const char *ssid     = "Nome Da Sua Rede";
const char *password = "Senha da sua rede";
const String serverAddress = "ip do servidor/data/temperatures"; //endereço ip do servidor + endpoint para a postagem dos dados

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP); 
WiFiClient client;

//Função que realiza a conexão com o Wifi
void wifiConnect() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print (".");
  }
}

//Função que retorna a leitura da temperatura
float getTemperature() {
  sensors.requestTemperatures(); 
  return sensors.getTempCByIndex(0);
}

//Função que retorna o minuto atual
int getTime() {
  timeClient.update();
  return timeClient.getMinutes();
}

//Função que monta o JSON com os dados e faz a postagem no servidor
void postData() {
  digitalWrite(LED_BUILTIN, LOW);
  HTTPClient http;
  http.begin(client, serverAddress); 
  http.addHeader("Content-Type", "application/json");
  
  // Monta o JSON
  StaticJsonDocument<200> doc;
  doc["sensor_name"] = "Quarto";
  doc["unit"] = "°C";
  doc["value"] = getTemperature();
  // Converte o JSON para string
  String requestBody;
  serializeJson(doc, requestBody);
  
  int httpCode = http.POST(requestBody);
  String payload = http.getString();
  Serial.println(httpCode);
  Serial.println(payload);
  http.end();
  digitalWrite(LED_BUILTIN, HIGH);
}

void setup() {
  Serial.begin(115200);
  wifiConnect();
  sensors.begin(); //Inicializa o sensor de temperatura
  timeClient.begin(); //Inicailiza o cliente NTP
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
}

void loop() {
  //Realiza o envio dos dados de hora em hora
  if(getTime() == 40) {
    postData();
    delay(60000); //Atraso de 1 minuto para não repetir o envio
  }
}
