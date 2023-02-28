import { Component, ViewChild } from '@angular/core';

import { AppService } from './app.service';
import DataSource from 'devextreme/data/data_source';
import ODataStore from 'devextreme/data/odata/store';
import * as _ from 'underscore';
import { DxPopupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource: DataSource;
  categoryList: any = [];
  products: any;
  currentArgument: any;
  @ViewChild(DxPopupComponent) popup: DxPopupComponent;

  constructor() {
    this.dataSource = new DataSource({
      store: new ODataStore({
        url: 'https://services.odata.org/V3/Northwind/Northwind.svc/Products_by_Categories',
      }),
      paginate: false,
      postProcess: (results) => {
        let arr = [];
        let grp = _.groupBy(results, 'CategoryName');
        for (let obj in grp) {
          arr.push({
            categoryName: obj,
            productList: grp[obj],
            value: grp[obj].length,
          });
        }
        this.categoryList = arr;
        return arr;
      },
    });
  }
  customizeTooltip(arg: any) {
    text: arg.valueText;
  }
  eventHandling(e: any) {
    let argument = e.target.argument;
    let category = this.categoryList.filter(
      (item: any) => item.categoryName === argument
    );
    this.products = category[0].productList;
    this.currentArgument = argument;
    this.popup.title = `Product List in ${this.currentArgument}`;
    this.popup.instance.show();
  }
}
