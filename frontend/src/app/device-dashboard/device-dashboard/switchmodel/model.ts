export interface OveralSwitchStatusModel {
  name: string;
  series?: SeriesEntity[] | null;
}

export class overalswitchobj implements OveralSwitchStatusModel {
  name: string;
  series?: SeriesEntity[];
}

export interface SeriesEntity {
  name: string;
  value: number;
  extra?: Extra;
}
export interface Extra {
  code: string;
}

export var multi = [];

export var switchFilterData = [];

export interface PeriodicElement {
  position: number;
  name: string;
  unused: number;
  planned: number;
}

export let ELEMENT_DATAs: PeriodicElement[] = [
  { position: 2, name: 'sw2', unused: 4, planned: 12 },
  { position: 2, name: 'sw3', unused: 4, planned: 12 },
  { position: 2, name: 'sw4', unused: 4, planned: 12 },
];
