import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { records } from '../models/records.model';

@Injectable({
  providedIn: 'root'
})
export class RecordrestService {
  private baseurl = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) { }

  getTopRecords() {
    return this.http.get(this.baseurl + '/records');
  }
}
