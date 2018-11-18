import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TmobileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TmobileProvider {
  DEMO_AUTH_TOKEN = 'Bearer 2d854235-c351-4b87-8d45-54770ec97e63';
  apiUrl = 'https://api.t-mobile.com';

  constructor(public http: HttpClient) {
    console.log('Hello TmobileProvider Provider');
  }

  getProducts(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'/v2/products', JSON.stringify(data),
      {
        headers: new HttpHeaders().set('Authorization', this.DEMO_AUTH_TOKEN),
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        console.log(err);
      });
    });
  }
}
