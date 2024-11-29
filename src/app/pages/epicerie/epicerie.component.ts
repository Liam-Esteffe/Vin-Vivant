import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-epicerie',
  templateUrl: './epicerie.component.html',
  styleUrls: ['./epicerie.component.scss']
})
export class EpicerieComponent implements OnInit {
  public value: string = ""; // Recherche actuelle
  public first: number = 0; // Index de départ pour la pagination
  public rows: number = 10; // Nombre de lignes à afficher par page

  public products: Array<any> = []; // Liste des produits affichés (filtrée)
  private allProducts: Array<any> = []; // Liste complète des produits
  public is_loading: boolean = true; // Indicateur de chargement

  EPICERIE_PRODUCTS_API = 'https://levinvivant.com/api/v1/products/epicerie/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getLatestProducts();
  }

  // Récupération des produits depuis l'API
  private getLatestProducts() {
    this.is_loading = true;
    this.http.get(this.EPICERIE_PRODUCTS_API).subscribe((results: any) => {
      this.allProducts = results.products; // Stocke la liste complète des produits
      this.products = [...this.allProducts]; // Initialise la liste affichée
      this.is_loading = false;
    });
  }

  // Mise à jour des produits lors d'une recherche
  onSearchChange() {
    if (this.value.trim() === '') {
      this.products = [...this.allProducts]; // Réinitialise la liste si la recherche est vide
      return;
    }

    this.products = this.allProducts.filter((product) =>
      product.name.toLowerCase().includes(this.value.toLowerCase())
    );
  }

  // Gestion de la pagination
  onPageChange(event: PageEvent | any) {
    this.is_loading = true;
    setTimeout(() => {
      this.first = event.first;
      this.rows = event.rows;
      this.is_loading = false;
    }, 500); // Simulation de chargement
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}