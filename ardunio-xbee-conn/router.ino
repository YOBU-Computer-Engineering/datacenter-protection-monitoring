#include <dht11.h>    // dht11 kütüphanesini kodlarımıza dahil ediyoruz.
#include "NewPing.h"  // mesafe sensörü  kütüphanesini kodlarımıza dahil ediyoruz.
#define TRIGGER_PIN 9
#define ECHO_PIN 10
#define MAX_DISTANCE 200  

NewPing sonar(TRIGGER_PIN, ECHO_PIN,MAX_DISTANCE);
float duration, distance;
int DhtPin=2;     // DhtPin olarak Dijital 2'yi belirliyoruz.
dht11 dht_sensor; // dht_sensor adında bir DHT11 nesnesi oluşturduk.
 
void setup()
{
  Serial.begin(9600); // Seri iletişimi başlatıyoruz.
  pinMode(7, OUTPUT);    // arduino port 7 çıkış
}
 
void loop()
{  
  int chk = dht_sensor.read(DhtPin); // Sensörden okunan değerleri değişkene aktarıyoruz.
  String gonderilecek ="";
  gonderilecek += "nem:"+String((float)dht_sensor.humidity, 2)+":";    //nem ve ısı değerini değişkene atadık.
  gonderilecek += "isi:"+String((float)dht_sensor.temperature, 2)+":";
  distance = sonar.ping_cm(); 
    
  if (distance <=300 || distance <= 2) 
  {
     gonderilecek += "mesafe:"+String((float)distance)+":";     // mesafe  değeri 2 ve 300 arasında ölçüldüğünde  değişkene atadık.
  }

  int sensorValue = analogRead(A0);
  gonderilecek += "hava:"+String(sensorValue);  //hava değerini değişkene atadık.
  Serial.print(gonderilecek); //bilgileri karakter dizisi şeklinde gönderdik.
  delay(2000); // Veriler her 2 saniyede bir veriler ekrana yazdırılacak.
}
