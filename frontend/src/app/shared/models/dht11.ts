export interface Dht {
  id: number;
  heat: string;
  humidity: string;
  date: number;
  device: Device;
}
export interface Device {
  id: number;
  name: string;
  mac_adres: string;
}


