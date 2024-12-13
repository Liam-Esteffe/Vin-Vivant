import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vin } from '../../interfaces/vin.interface';
import { environment } from '../../../../environments/environments';
import { Subject, takeUntil } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PaginatorState } from 'primeng/paginator';

interface Region {
  id: number;
  name: string;
}

interface WineType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-vin',
  templateUrl: './vin.component.html',
  styleUrl: './vin.component.scss',
})
export class VinComponent implements OnInit, OnDestroy {
  // Pagination
  public first: number = 0;
  public rows: number = 12; // Changé à 12 pour un meilleur affichage en grille

  // Filtres
  public searchValue: string = '';
  public selectedRegion: string = '';
  public selectedType: string = '';

  // Données
  public products: Array<Vin> = [];
  private allProducts: Array<Vin> = [];
  public uniqueRegions: Array<Region> = [];
  public uniqueTypes: Array<WineType> = [];

  // États
  public isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  // URLs API
  private readonly apiUrl: string = environment.apiUrl;
  private readonly VIN_PRODUCTS_API = `${this.apiUrl}products/vins/`;
  private readonly VINS_REGION_API = `${this.apiUrl}regions/`;
  private readonly VINS_TYPE_API = `${this.apiUrl}types/`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeData(): void {
    this.isLoading = true;
    Promise.all([
      this.fetchProducts(),
      this.fetchRegions(),
      this.fetchTypes(),
    ]).finally(() => {
      this.isLoading = false;
    });
  }

  private fetchProducts(): Promise<void> {
    return new Promise((resolve) => {
      this.http
        .get<{ products: Vin[] }>(this.VIN_PRODUCTS_API)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => resolve()),
        )
        .subscribe({
          next: (response) => {
            this.allProducts = response.products;
            this.products = [...this.allProducts];
          },
          error: (error) => {
            console.error('Erreur lors du chargement des produits:', error);
            this.products = [];
            this.allProducts = [];
          },
        });
    });
  }

  private fetchRegions(): Promise<void> {
    return new Promise((resolve) => {
      this.http
        .get<Region[]>(this.VINS_REGION_API)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => resolve()),
        )
        .subscribe({
          next: (regions) => (this.uniqueRegions = regions),
          error: (error) => {
            console.error('Erreur lors du chargement des régions:', error);
            this.uniqueRegions = [];
          },
        });
    });
  }

  private fetchTypes(): Promise<void> {
    return new Promise((resolve) => {
      this.http
        .get<WineType[]>(this.VINS_TYPE_API)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => resolve()),
        )
        .subscribe({
          next: (types) => (this.uniqueTypes = types),
          error: (error) => {
            console.error('Erreur lors du chargement des types:', error);
            this.uniqueTypes = [];
          },
        });
    });
  }

  // Gestionnaires d'événements
  public onSearchChange(): void {
    this.applyFilters();
  }

  public onRegionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedRegion = select.value;
    this.applyFilters();
  }

  public onTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedType = select.value;
    this.applyFilters();
  }

  public onPageChange(event: PaginatorState): void {
    this.isLoading = true;
    setTimeout(() => {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 12;
      this.isLoading = false;
    }, 300);
  }

  // Logique de filtrage
  private applyFilters(): void {
    let filtered = [...this.allProducts];

    // Filtre par recherche
    if (this.searchValue.trim()) {
      const searchTerm = this.searchValue.toLowerCase().trim();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filtre par région
    if (this.selectedRegion) {
      filtered = filtered.filter(
        (product) => product.region.toString() === this.selectedRegion,
      );
    }

    // Filtre par type
    if (this.selectedType) {
      filtered = filtered.filter(
        (product) => product.types.toString() === this.selectedType,
      );
    }

    this.products = filtered;
    this.first = 0; // Reset pagination when filtering
  }

  // Méthodes utilitaires
  public trackByProductId(index: number, product: Vin): number {
    return product.id;
  }
}
