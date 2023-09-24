import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {_baseUrl} from 'src/environment/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseurl:string = _baseUrl;
  constructor(private http: HttpClient) { }

  get(path:string): Observable<any> {
    return this.http.get(this.baseurl + path)
  }

  getById(path:string): Observable<any> {
    return this.http.get(this.baseurl + path);
  }

  delete(path:string): Observable<any> {
    return this.http.get(this.baseurl + path)
  }

  put(data: any, path:string): Observable<any> {
    return this.http.put(this.baseurl + path, data);
  }

  post(data: any,path:string): Observable<any> {
    return this.http.post(this.baseurl + path, data);
  }

}
