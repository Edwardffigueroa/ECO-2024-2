
/**
 * BasicHTTPClient.ino
 *
 *  Created on: 24.05.2015
 *
 */

#include <Arduino.h>

#include <WiFi.h>
#include <WiFiMulti.h>

#include <HTTPClient.h>

#define USE_SERIAL Serial

WiFiMulti wifiMulti;

const int potentiometerPin = 34;
const int btnPin = 22;

const char *ssid = "your wifi";
const char *password = "your pass";

HTTPClient http;

void sendPotValue(int potValue) {

  http.begin("https://79e6-190-131-197-166.ngrok-free.app/potenciometro");  //URL HTTP SERVER
  http.addHeader("Content-Type", "application/json");

  String httpRequestData = "{\"value\":" + String(potValue) + "}";
  int httpCode = http.POST(httpRequestData);

  // httpCode will be negative on error
  if (httpCode > 0) {
    // HTTP header has been send and Server response header has been handled
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
    }
  } else {
    USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

void sendBtnValue(int btnValue) {

  http.begin("https://79e6-190-131-197-166.ngrok-free.app/button");  //HTTP
  http.addHeader("Content-Type", "application/json");

  String httpRequestData = "{\"value\":" + String(btnValue) + "}";
  int httpCode = http.POST(httpRequestData);

  // httpCode will be negative on error
  if (httpCode > 0) {
    // HTTP header has been send and Server response header has been handled
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
    }
  } else {
    USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}

void setup() {
  pinMode(btnPin, INPUT_PULLDOWN);
  USE_SERIAL.begin(115200);

  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();

  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  wifiMulti.addAP(ssid, password);

  Serial.println("WiFi connected.");
}

void loop() {

  // wait for WiFi connection
  if ((wifiMulti.run() == WL_CONNECTED)) {

    int potentiometerValue = analogRead(potentiometerPin);
    char potentiometerStr[10];
    sprintf(potentiometerStr, "%d", potentiometerValue);
    Serial.println(potentiometerStr);

    sendPotValue(potentiometerValue);

    int button = digitalRead(22);

    if (button == HIGH) {
      sendBtnValue(button);
    }
  }

  delay(50);
}
