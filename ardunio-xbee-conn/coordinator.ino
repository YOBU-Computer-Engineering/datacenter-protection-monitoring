#include <LiquidCrystal.h>  //LCD ekranını kullanmak için kütüphane ekledik.
LiquidCrystal lcd(12,11,5,4,3,2); //LCD ekranın giriş portlarını belirttik.
int led = 9;
int buzzer = 6;
void setup(){ 
  pinMode(led,OUTPUT);
  pinMode(buzzer, OUTPUT);  
  Serial.begin(9600);
  lcd.begin(16,2);
  lcd.setCursor(0,0); //lcd.home(); ile aynı.
  lcd.print("Cihaz Basliyor...");
  delay(1000);
  lcd.clear();
  
  lcd.setCursor(0,0); //ikinci satırda.
  lcd.print("Veri Yok");
  delay(1000);

}
void loop(){
  if (Serial.available()){  //veri geliyorsa 
    lcd.clear();

    //aşağıdaki kod routerdan string olarak gelen değerlerin parçalanması ve değişkenlere atamak için kullanılır.
    String a  = Serial.readString(); // okunan değeri değişkene atadık.

    int isi_index = a.indexOf("isi:"); //bulursa index no döner, bulmazsa -1
    isi_index += 4;
    String isi_deger = a.substring(isi_index, isi_index+2);

    int nem_index = a.indexOf("nem:"); //bulursa index no döner, bulmazsa -1
    nem_index += 4;
    String nem_deger = a.substring(nem_index, nem_index+2);

    int hava_index = a.indexOf("hava:"); //bulursa index no döner, bulmazsa -1
    hava_index += 5;
    String hava_deger = a.substring(hava_index, hava_index+3);

    int mesafe_index = a.indexOf("mesafe:"); //bulursa index no döner, bulmazsa -1
    mesafe_index += 7;

    
    String mesafe_deger = a.substring(mesafe_index, mesafe_index+2); //
    String son_karakter = mesafe_deger.substring(mesafe_deger.length()-1, mesafe_deger.length()); //ölçülen mesafenin  son karakteri silmek için.
   
   if(son_karakter.toInt()>0)
   {
    mesafe_deger = a.substring(mesafe_index, mesafe_index+2);
   } else {
    mesafe_deger = a.substring(mesafe_index, mesafe_index+1);
   }

    digitalWrite(buzzer, LOW);
    if(hava_deger.toInt() > 500) //hava değeri 500 değerini geçtiğinde buzzer çalışsın.
    {
      digitalWrite(buzzer, HIGH); 
      //tone(buzzer,262);
      delay(150);
      digitalWrite(buzzer, LOW);
      //noTone(buzzer);
      delay(20);
    }

    if(mesafe_deger.toInt() > 3){ //mesafe değeri 3'den fazla olduğunda LED yansın.
      digitalWrite(led, HIGH);
    }else{
      digitalWrite(led, LOW);
    }
    
    lcd.setCursor(0,0);
    lcd.print("isi:" + isi_deger); //ısı değerini LCD ekrana yazdırdık.

    lcd.setCursor(7, 0);
    lcd.print("nem:"+ nem_deger); //nem değerini LCD ekrana yazdırdık.

    lcd.setCursor(0, 1);
    lcd.print("hava:"+hava_deger); //hava değerini LCD ekrana yazdırdık.

    lcd.setCursor(9, 1);
    lcd.print("ms:"+mesafe_deger+"cm"); //mesafe değerini LCD ekrana yazdırdık.
    Serial.println(isi_deger+","+nem_deger+","+hava_deger+","+mesafe_deger);
  }
  delay(100);
}
