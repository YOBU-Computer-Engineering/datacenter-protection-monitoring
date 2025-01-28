import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Dht11Service } from 'src/app/core/services/dht11.service';
import { HcrsService } from 'src/app/core/services/hcrs.service';
import { MqService } from 'src/app/core/services/mq.service';

export interface TriggeredDistanceSensor {
  position?: number;
  name: string;
  device: string;
  mac: string;
  triggeredDate: string;
}

const TRIGGERED_TABLE_DATA: TriggeredDistanceSensor[] = [];

@Component({
  selector: 'app-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.css'],
  
})
export class DeviceDashboardComponent implements OnInit {
  events: string[] = [];

  addEvent(type: string, event: any) {
    var date = new Date(event.value);

    var selectedDate =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getDate()).slice(-2) +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2);
    var selectedDateTomorrow =
      date.getFullYear() +
      '-' +
      ('00' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + (date.getDate() + 1)).slice(-2) +
      ' ' +
      ('00' + date.getHours()).slice(-2) +
      ':' +
      ('00' + date.getMinutes()).slice(-2) +
      ':' +
      ('00' + date.getSeconds()).slice(-2);

    this.getDhtsWithTimeInterval(selectedDate, selectedDateTomorrow);
    this.getAirQualitiesTimeInterval(selectedDate, selectedDateTomorrow);
    this.getTriggeredDatesTimeInterval(selectedDate, selectedDateTomorrow);
  }

  @ViewChild('picker') picker: any;
  open() {
    this.picker.open();
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'device',
    'mac',
    'triggeredDate',
  ];
  dataSource = TRIGGERED_TABLE_DATA;

  dht11List: any[] = [];
  airQualityList: any[] = [];
  view: any[] = [750, 0];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel2: boolean = true;
  showXAxisLabel2: boolean = true;
  xAxisLabel: string = 'Hour(Avarage of hours. Formula=Hour datas sum/data lenght)';;
  yAxisLabel: string = 'Heat & Humidity';
  xAxisLabel2: string = 'Hour(Avarage of hours. Formula=Hour datas sum/data lenght)';
  yAxisLabel2: string = 'Level Of Air Quality';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(
    private dhtService: Dht11Service,
    private mqService: MqService,
    private hcrsService: HcrsService
  ) {}
  ngOnInit(): void {
  }
  getMq() {
    this.mqService.getMq().subscribe((x) => {
      let mqTempArray = [
        {
          name: 'AirQuality',
          series: [{ name: '', value: 0 }],
        },
      ];

      this.mqService.getMq().subscribe((a) => {
        for (let i = 0; i < a.length; i++) {
          mqTempArray[0].series.push({
            name: `${new Date(x[i].date).getHours()}:00`,
            value: Number(x[i].airQualityValue),
          });
        }
        this.airQualityList = mqTempArray;
      });
    });
  }
  getTriggeredDatesTimeInterval(
    selectedDate: String,
    selectedDateTomorrow: String
  ) {
    let triggeredTemporaryArray: any = [];
    this.hcrsService
      .getDhtsWithTimeInterval(selectedDate, selectedDateTomorrow)
      .subscribe((hcrs) => {
        for (let i = 0; i < hcrs.length; i++) {
          triggeredTemporaryArray.push({
            name: hcrs[i].device.name.substr(0, 44),
            device: hcrs[i].device.name.substr(44),
            mac: hcrs[i].device.mac_adres,
            triggeredDate: hcrs[i].triggeredDate,
          });
        }
        this.dataSource = triggeredTemporaryArray;
        this.dataSource = [...this.dataSource];
      });
  }

  getAirQualitiesTimeInterval(
    selectedDate: String,
    selectedDateTomorrow: String
  ) {
    let mqTempArray = [
      {
        name: 'AirQuality',
        series: [{ name: '', value: 500 }],
      },
    ];

    this.mqService
      .getMqWithTimeInterval(selectedDate, selectedDateTomorrow)
      .subscribe((mq135s) => {

        //start of calculate avarage of times
        let saatler_uni: any = [];
        let saatler = [];
        for (let i = 0; i < mq135s.length; i++) {
          var tarih = new Date(mq135s[i].date);
          saatler.push(tarih.getHours());
        }
        saatler.forEach((c) => {
          if (!saatler_uni.includes(c)) {
            saatler_uni.push(c);
          }
        });

        let obj = [];
        for (var j = 0; j < saatler_uni.length; j++) {
          var lo = [];
          for (var a = 0; a < mq135s.length; a++) {
            var tarih = new Date(mq135s[a].date);

            if (tarih.getHours() == saatler_uni[j]) {
              var saat = saatler_uni[j];
              var veri = mq135s[a];
              var aqv = parseInt(veri.airQualityValue);

              lo.push({ saat, veri });
            }
          }
          obj.push(lo);
        }

        var avarageArray = [];
        for (let i = 0; i < obj.length; i++) {
          let sabir = obj[i];

          let toplam = 0;
          let airQualityValue = 0;
          let d = '';
          let device = null;
          for (let j = 0; j < sabir.length; j++) {
            var aqv = parseInt(sabir[j].veri.airQualityValue);
            toplam = toplam + aqv;
            airQualityValue = toplam / sabir.length;
            d =
              sabir[j].veri.date.split(' ')[0] + ' ' + sabir[j].saat + ':00:00';
            device = sabir[j].veri.device;
          }
          var id = i;
          avarageArray.push({ id, d, airQualityValue, device });
        }
        //end of calculate avarage of times

        for (let i = 0; i < avarageArray.length; i++) {
          mqTempArray[0].series.push({
            name: `${new Date(avarageArray[i].d).getHours()}`,
            value: Number(avarageArray[i].airQualityValue),
          });
        }
        mqTempArray[0].series.sort(function(a, b){return Number(a.name) - Number(b.name)})

        this.airQualityList = mqTempArray;
      });
  }


  
  getDhtsWithTimeInterval(selectedDate: String, selectedDateTomorrow: String) {
    let dhtTempArr = [
      {
        name: 'Heat',
        series: [{ name: '', value: 0 }],
      },
      {
        name: 'Humidity',
        series: [{ name: '', value: 0 }],
      },
    ];
    this.dhtService
      .getDhtsWithTimeInterval(selectedDate, selectedDateTomorrow)
      .subscribe((dht11s) => {
        let saatler_uni: any = [];
        let saatler = [];
        for (let i = 0; i < dht11s.length; i++) {
          var tarih = new Date(dht11s[i].date);
          saatler.push(tarih.getHours());
        }
        saatler.forEach((c) => {
          if (!saatler_uni.includes(c)) {
            saatler_uni.push(c);
          }
        });

        let obj = [];
        for (var j = 0; j < saatler_uni.length; j++) {
          var lo = [];
          for (var a = 0; a < dht11s.length; a++) {
            var tarih = new Date(dht11s[a].date);

            if (tarih.getHours() == saatler_uni[j]) {
              var saat = saatler_uni[j];
              var veri = dht11s[a];
              var heat = parseInt(veri.heat);
              var humidity = parseInt(veri.humidity);

              lo.push({ saat, veri });
            }
          }
          obj.push(lo);
        }

        var avarageArray = [];
        for (let i = 0; i < obj.length; i++) {
          let sabir = obj[i];

          let sumHeat = 0;
          let sumHumidity = 0;
          let heatValue = 0;
          let humidityValue = 0;
          let d = '';
          let device = null;
          for (let j = 0; j < sabir.length; j++) {
            var heat = parseInt(sabir[j].veri.heat);
            var humidity = parseInt(sabir[j].veri.humidity);
            sumHeat = sumHeat + heat;
            sumHumidity = sumHeat + humidity;
            heatValue = sumHeat / sabir.length;
            humidityValue = sumHumidity / sabir.length
            d =
              sabir[j].veri.date.toString().split(' ')[0] + ' ' + sabir[j].saat + ':00:00';
            device = sabir[j].veri.device;
          }
          var id = i;
          avarageArray.push({ id, d, heatValue, humidityValue, device });
        }
        console.log("🚀 ~ file: device-dashboard.component.ts ~ line 295 ~ DeviceDashboardComponent ~ .subscribe ~ avarageArray", avarageArray)

        for (let i = 0; i < avarageArray.length; i++) {
          dhtTempArr[0].series.push({
            name: `${new Date(avarageArray[i].d).getHours()}`,
            value: Number(avarageArray[i].heatValue),
          });
          dhtTempArr[1].series.push({
            name: `${new Date(avarageArray[i].d).getHours()}`,
            value: Number(avarageArray[i].humidityValue),
          });
        }
        
        dhtTempArr[0].series.sort(function(a, b){return Number(a.name) - Number(b.name)})
        dhtTempArr[1].series.sort(function(a, b){return Number(a.name) - Number(b.name)})
        
        console.log("🚀 ~ file: device-dashboard.component.ts ~ line 312 ~ DeviceDashboardComponent ~ .subscribe ~ dhtTempArr", dhtTempArr)
        this.dht11List = dhtTempArr;
        this.dht11List = [...this.dht11List]
      });
  }

  getDht() {
    let data = [
      {
        name: 'Heat',
        series: [{ name: '', value: 0 }],
      },
      {
        name: 'Humidity',
        series: [{ name: '', value: 0 }],
      },
    ];

    this.dhtService.getDht().subscribe((x) => {
      for (let i = 0; i < x.length; i++) {
        data[0].series.push({
          name: `${new Date(x[i].date).getHours()}:00`,
          value: Number(x[i].heat),
        });
        data[1].series.push({
          name: `${new Date(x[i].date).getHours()}`,
          value: Number(x[i].humidity),
        });
      }
      this.dht11List = data;
    });
  }

  // onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }
}
