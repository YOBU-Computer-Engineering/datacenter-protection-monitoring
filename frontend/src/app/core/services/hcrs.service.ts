import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HcrsService {
  path = 'hcsr';

  constructor(private http: HttpClient) {}
  // .get<Dht>(`${environment.apiUrl}/${this.path}/all`)


  getDhtsWithTimeInterval(selectedDate:String, selectedDateTomorrow:String): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/${this.path}/getbyday`+`?d1=${selectedDateTomorrow}&d2=${selectedDate}`)
      .pipe(map(x => x));
  }
  
}
