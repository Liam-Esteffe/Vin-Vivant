import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-epicerie',
  templateUrl: './epicerie.component.html',
  styleUrl: './epicerie.component.scss'
})
export class EpicerieComponent {
  constructor(private http: HttpClient) {
  }
  public products: Array<any> = [];
  public is_loading: boolean = true;
  apiUrl: string = environment.apiUrl;

  EPICERIE_PRODUCTS_API = `${this.apiUrl}products/epicerie/`
  value: string = "";
  public filteredProducts: Array<any> = [];
  first: number = 0;
  rows: number = 10;

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

  private getLatestProducts() {
    this.http.get(this.EPICERIE_PRODUCTS_API).subscribe((results: any) => {
      this.products = results.products;
      this.is_loading = false;
    })
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