#include <Arduino.h>

#include <WiFi.h>
#include <PubSubClient.h>

// Defina o SSID e a senha do Wi-Fi
const char *ssid = "CLARO304";
const char *password = "Coutinho12";

// conectar ao MQTT
const char *topic = "SmartHub";
const char *mqttServer = "broker.hivemq.com";
const int mqttPort = 1883;
int ledState = HIGH; // Inicialmente o LED está desligado

WiFiClient clientWIFI;
PubSubClient client(clientWIFI);

// pins
// int pinLedGPIO4 = 0;

int ledsPins[14] =       {0,   15,   4,   18,  22,  19,  21,    32,   13,   25,   27,   12,   32,    12};
String messagePost[14] = {"5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"};

void callback(char *topic, byte *payload, unsigned int length);
void connectMQTT();
void connectWifi();
int getLedPin(String message);
void setup()
{

    Serial.begin(115200);

    for (int i = 0; i < 14; i++)
    {
        pinMode(ledsPins[i], OUTPUT);
    }

    connectWifi();

    client.setServer(mqttServer, mqttPort);
    client.setCallback(callback);
}

void loop()
{

    if (!client.connected())
    {
        connectMQTT();
    }
    client.loop();
}

void connectWifi()
{

    Serial.print("Conectando ao WIFI...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("WiFi conectado");
}

void connectMQTT()
{

    while (!client.connected())
    {
        Serial.print("Conectando ao MQTT...");
        if (client.connect("esp32_tb_iot_es"))
        {
            Serial.println(" Conectado ao broker MQTT!");
            client.subscribe(topic);
        }
        else
        {
            Serial.print("Falha, rc=");
            Serial.print(client.state());
            Serial.println(" Tentando novamente em 5 segundos");
            delay(5000);
        }
    }
}

void changeStateLed(int led)
{
    ledState = (ledState == HIGH) ? LOW : HIGH;
    digitalWrite(led, ledState);
    Serial.println("State " + ledState);
}

void callback(char *topic, byte *payload, unsigned int length){

    String message;
    for (int i = 0; i < length; i++)
    {
        message += (char)payload[i];
        Serial.println("message "+message);
    }

    int ledPin = getLedPin(message);
    if (ledPin != -1) {
        changeStateLed(ledPin);
    }
}
int getLedPin(String message) {
    for (int i = 0; i < 14; i++) {
        if (message == messagePost[i]) {
            return ledsPins[i];
        }
    }
    Serial.println("not found pin");
    return -1;
}



