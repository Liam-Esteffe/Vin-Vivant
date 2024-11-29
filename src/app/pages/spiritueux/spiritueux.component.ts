import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spiritueux',
  templateUrl: './spiritueux.component.html',
  styleUrls: ['./spiritueux.component.scss']
})
export class SpiritueuxComponent implements OnInit {
  public value: string = ""; // Recherche actuelle
  public first: number = 0; // Index de départ pour la pagination
  public rows: number = 10; // Nombre de lignes à afficher par page

  public products: Array<any> = []; // Liste des produits affichés (filtrée)
  private allProducts: Array<any> = []; // Liste complète des produits
  public uniqueRegions: Array<any> = []; // Liste des régions uniques
  public selectedRegion: string = ""; // Région actuellement sélectionnée
  public is_loading: boolean = true; // Indicateur de chargement

  SPIRITUEUX_PRODUCTS_API = 'https://levinvivant.com/api/v1/products/spiritueux/';
  SPIRITUEUX_REGIONS_API = 'https://levinvivant.com/api/v1/regions/';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getLatestProducts();
    this.extractUniqueRegions();
  }

  // Récupération des produits depuis l'API
  private getLatestProducts() {
    this.is_loading = true;
    this.http.get(this.SPIRITUEUX_PRODUCTS_API).subscribe((results: any) => {
      this.allProducts = results.products; // Stocke la liste complète des produits
      this.products = [...this.allProducts]; // Initialise la liste affichée
      this.is_loading = false;
    });
  }

  // Récupération des régions uniques depuis l'API
  private extractUniqueRegions() {
    this.http.get(this.SPIRITUEUX_REGIONS_API).subscribe((result: any) => {
      this.uniqueRegions = result; // Stocke les régions uniques
    });
  }

  // Mise à jour des produits lors d'une recherche
  onSearchChange() {
    this.applyFilters();
  }

  // Mise à jour des produits lors d'un changement de région
  onRegionChange(event: any) {
    this.selectedRegion = event.target.value; // Met à jour la région sélectionnée
    this.applyFilters();
  }

  // Méthode centrale pour appliquer les filtres
  private applyFilters() {
    let filtered = [...this.allProducts]; // Copie de la liste complète

    // Filtre par recherche
    if (this.value.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(this.value.toLowerCase())
      );
    }

    // Filtre par région
    if (this.selectedRegion && this.selectedRegion !== "all") {
      filtered = filtered.filter(
        (product) => parseInt(product.region) === parseInt(this.selectedRegion)
      );
    }

    this.products = filtered; // Met à jour la liste affichée
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