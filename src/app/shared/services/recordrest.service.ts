import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getUserRecords(username: string, token: string){
    const headers = new HttpHeaders().set("Authorization", token) ;
    return this.http.get(this.baseurl + '/records/' + username,  {headers});
  }

  postRecord(newRecord: records, token: string) {
    const headers = new HttpHeaders().set("Authorization", token) ;
    return this.http.post(this.baseurl + '/records', newRecord, {headers, observe: 'response'});
  }
}
