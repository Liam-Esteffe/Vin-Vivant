import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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

  constructor(private http: HttpClient) { }

  public products: Array<Vin> = []; // Liste des produits affichés (filtrée)
  private allProducts: Array<Vin> = []; // Liste complète des produits (non filtrée)
  public is_loading: boolean = true;
  public uniqueRegions: Array<any> = []; // Stocke les régions uniques
  public selectedRegion: string = "";
  apiUrl: string = environment.apiUrl;
  VIN_PRODUCTS_API = `${this.apiUrl}products/vins/`;
  VINS_REGION_API = `${this.apiUrl}regions/`;

  ngOnInit() {
    this.getLatestProducts();
  }

  // Récupération des produits
  private getLatestProducts() {
    this.http.get(this.VIN_PRODUCTS_API).subscribe((results: any) => {
      this.allProducts = results.products; // Stocke la liste complète des produits
      this.products = [...this.allProducts]; // Initialise la liste filtrée
      this.is_loading = false;
      this.extractUniqueRegions();
    });
  }

  // Récupération des régions uniques
  private extractUniqueRegions() {
    this.http.get(this.VINS_REGION_API).subscribe((result: any) => {
      this.uniqueRegions = result;
    });
  }

  // Mise à jour des produits lors d'une recherche
  onSearchChange() {
    this.applyFilters(); // Applique les filtres sur la liste complète
  }

  // Mise à jour des produits lors d'un changement de région
  onRegionChange(event: any) {
    this.selectedRegion = event.target.value; // Récupère la région sélectionnée
    this.applyFilters(); // Applique les filtres sur la liste complète
  }

  // Méthode centrale pour appliquer les filtres
  private applyFilters() {
    let filtered = [...this.allProducts]; // Copie de la liste complète

    // Filtre par recherche (si le champ n'est pas vide)
    if (this.value.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(this.value.toLowerCase())
      );
    }

    // Filtre par région (si une région est sélectionnée)
    if (this.selectedRegion && this.selectedRegion !== "all") {
      filtered = filtered.filter(
        (product) => parseInt(product.region) === parseInt(this.selectedRegion)
      );
    }

    this.products = filtered; // Met à jour la liste affichée
  }

  // Pagination
  onPageChange(event: PageEvent | any) {
    this.is_loading = true; // Active le loader pour simuler le chargement
    setTimeout(() => {
      this.first = event.first;
      this.rows = event.rows;
      this.is_loading = false; // Désactive le loader après mise à jour des indices
    }, 500);
  }
}

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}