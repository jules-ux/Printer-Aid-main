#define LDRpin A0 // pin where we connected the LDR and the resistor
// LDR VALUE in printer during print : 985 - 195
// LDR VALUE in printer when not printing : 805 - 815

int LDRValue = 0;     // result of reading the analog pin
int onValue = 920;
bool previousState = 0;

void setup() {
  Serial.begin(9600); // sets serial port for communication
}

void loop() {
  LDRValue = analogRead(LDRpin); // read the value from the LDR
  // Serial.println(LDRValue);      // print the value to the serial port
  // delay(100);                    // wait a little

  if (LDRValue >= onValue && previousState == 0){
    Serial.println("on");
    previousState = 1;

  }

  if (previousState == 1 && LDRValue < onValue){
    Serial.println("off");
    previousState = 0;
  }
}
