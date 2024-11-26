import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spiritueux',
  templateUrl: './spiritueux.component.html',
  styleUrls: ['./spiritueux.component.scss']
})
export class SpiritueuxComponent {
  public products: Array<any> = [];
  public is_loading: boolean = true;
  public value: string = "";
  first: number = 0;
  rows: number = 10;
  SPIRITUEUX_PRODUCTS_API = 'https://levinvivant.com/api/v1/products/spiritueux/';
  public filteredProducts: Array<any> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getLatestProducts();
  }

  private getLatestProducts() {
    this.is_loading = true; // Active le loader lors du chargement initial
    this.http.get(this.SPIRITUEUX_PRODUCTS_API).subscribe((results: any) => {
      this.products = results.products;
      this.is_loading = false;
    });
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
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}