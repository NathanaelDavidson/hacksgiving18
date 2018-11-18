import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TmobileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

class Filter {
  readonly label: string;
  public selected: boolean;

  constructor(label: string, selected: boolean) {
    this.label = label;
    this.selected = selected;
  }
}

export class FilterSet {
  readonly label: string;
  readonly filters: Array<Filter>;

  constructor(label: string, filters: Array<Filter>) {
    this.label = label;
    this.filters = filters;
  }
  //label: label of the filter to be selected or deselected
  //selected: true if filter should be selected, false if it should be deselected
  setSelection(label: string, selected: boolean) {
    for(var i = 0; i < this.filters.length; i++) {
      if (this.filters[i].label === label) {
        this.filters[i].selected = selected;
        break;
      }
    }
  }

  getSelected() {
    return this.filters.filter(this.checkSelection);
  }

  checkSelection(filter: Filter) {
    return filter.selected;
  }
}

@Injectable()
export class TmobileProvider {
  DEMO_AUTH_TOKEN = 'Bearer 2d854235-c351-4b87-8d45-54770ec97e63';
  apiUrl = 'https://api.t-mobile.com';

  constructor(public http: HttpClient) {
    console.log('Hello TmobileProvider Provider');
  }

  asObj(filterSet: FilterSet) {
    var object = {
      "fieldName": filterSet.label,
      "values": filterSet.getSelected(),
    };
    return object;
  }
  //Creates a javascript object representing search parameters to be passed into the getProducts method.
  makeQueryData(productTypes: Array<string>, filterOptions: Array<FilterSet>, pageSize: string, pageNumber: string) {
    var queryData = {
      "productTypes": productTypes,
      "filterOptionsSelected": filterOptions.map(this.asObj),
      "pageSize": pageSize,
      "pageNumber": pageNumber
    };
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

