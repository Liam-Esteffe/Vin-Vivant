import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Vin } from '../../interfaces/vin.interface';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-vin',
  templateUrl: './vin.component.html',
  styleUrl: './vin.component.scss'
})
export class VinComponent implements OnInit {
  public value: string = "";
  first: number = 0;
  rows: number = 10;

  constructor(private http: HttpClient) {
  }
  public products: Array<Vin> = [];
  public is_loading: boolean = true;
  apiUrl: string = environment.apiUrl;

  VIN_PRODUCTS_API = `${this.apiUrl}products/vins/`
  public filteredProducts: Array<any> = [];

  ngOnInit() {
    this.getLatestProducts()
  }

  selectProduct(product: any) {
    this.value = product.name; // Met le nom du produit dans l'input
    this.filteredProducts = []; // Ferme le dropdown
    // Optionnel : navigue vers une autre page ou affiche des détails
    console.log('Produit sélectionné :', product);
  }

  onSearchChange() {
    if (this.value.trim() === '') {
      this.filteredProducts = [];
      return;
    }

    if (this.value.length > 3) {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.value.toLowerCase())
    );
  }
}


  onPageChange(event: PageEvent | any) {
    this.is_loading = true; // Réactive le loader pour simuler le chargement
    setTimeout(() => { // Simulation d'un délai pour afficher le loader
      this.first = event.first;
      this.rows = event.rows;
      this.is_loading = false; // Désactive le loader après mise à jour des indices
    }, 500); // Ajuste ce délai selon l'effet visuel souhaité
  }


  private getLatestProducts() {
    this.http.get(this.VIN_PRODUCTS_API).subscribe((results: any) => {
      this.products = results.products;
      this.is_loading = false;
    })
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}