int LED1 = 3;
int POTEN = A0;
int potValue;
int dimmer;

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(POTEN, INPUT);
  Serial.begin(9600);
}

void loop() {
  potValue = analogRead(POTEN);
  dimmer = map(potValue, 0, 1023, 0, 255);
  String jsonString = "{\"potValue\":" + String(dimmer) + "}";  // example of reading as json

  Serial.println(jsonString);  // send data through serial to any device or server who wants to read those data

  if (Serial.available() > 0) {
    String message = Serial.readStringUntil('\n');
    if (message.equals("ON")) {
      digitalWrite(LED1, HIGH);
    } else if (message.equals("OFF")) {
      digitalWrite(LED1, LOW);
    } else {
      // int sensorValue1 = message.toInt();
      // analogWrite(LED1, sensorValue1);
    }
  }

  delay(100);
}
