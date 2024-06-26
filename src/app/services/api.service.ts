import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl: string = "https://localhost:44358/";

  constructor(private http: HttpClient) { }

  get(path:string): Observable<any> {
    return this.http.get(this.baseurl + path)
  }

  getByDetails(path:string): Observable<any> {
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
