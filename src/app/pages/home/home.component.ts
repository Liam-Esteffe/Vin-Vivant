import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ViewportScroller } from '@angular/common';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private scroller: ViewportScroller,) {
  }
  apiUrl: string = environment.apiUrl;

  LATEST_PRODUCTS_API = `${this.apiUrl}latest-products`

  public latest_products: Array<any> = [];

  ngOnInit() {
    this.getLatestProducts()
  }


  private getLatestProducts() {
    this.http.get(this.LATEST_PRODUCTS_API).subscribe((results: any) => {
      this.latest_products = results;
    })
  }

  public scrollToAnchor(index: string) {
    this.scroller.scrollToAnchor(index);
  }
}
