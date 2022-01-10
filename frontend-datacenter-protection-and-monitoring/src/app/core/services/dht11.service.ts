import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dht } from '../../shared/models/dht11';

@Injectable({
  providedIn: 'root',
})
export class Dht11Service {
  path = 'dht';

  constructor(private http: HttpClient) {}
  // .get<Dht>(`${environment.apiUrl}/${this.path}/all`)

  getDht(): Observable<Dht[]> {
    return this.http
      .get<Dht[]>(`${environment.apiUrl}/${this.path}/all`)
      .pipe(map(x => x));
  }

  getDhtsWithTimeInterval(selectedDate:String, selectedDateTomorrow:String): Observable<Dht[]> {
    return this.http
      .get<Dht[]>(`${environment.apiUrl}/${this.path}/getbyday`+`?d1=${selectedDateTomorrow}&d2=${selectedDate}`)
      .pipe(map(x => x));
  }
}
