import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PaginatorState } from 'primeng/paginator';
import { environment } from '../../../../environments/environments';

interface Product {
  id: number;
  name: string;
  price: number;
  region: number;
  alcool_degree: number;
  in_stock: boolean;
  get_image: string;
}

interface Region {
  id: number;
  name: string;
}

@Component({
  selector: 'app-spiritueux',
  templateUrl: './spiritueux.component.html',
  styleUrls: ['./spiritueux.component.scss']
})
export class SpiritueuxComponent implements OnInit, OnDestroy {
  // Pagination
  public first: number = 0;
  public rows: number = 12;

  // Filtres
  public searchValue: string = '';
  public selectedRegion: string = '';

  // Données
  public products: Array<Product> = [];
  private allProducts: Array<Product> = [];
  public uniqueRegions: Array<Region> = [];

  // États
  public isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  // URLs API
  private readonly apiUrl: string = environment.apiUrl;
  private readonly SPIRITUEUX_PRODUCTS_API = `${this.apiUrl}products/spiritueux/`;
  private readonly SPIRITUEUX_REGIONS_API = `${this.apiUrl}regions/`;

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
      this.fetchRegions()
    ]).finally(() => {
      this.isLoading = false;
    });
  }

  private fetchProducts(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<{products: Product[]}>(this.SPIRITUEUX_PRODUCTS_API)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => resolve())
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
          }
        });
    });
  }

  private fetchRegions(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<Region[]>(this.SPIRITUEUX_REGIONS_API)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => resolve())
        )
        .subscribe({
          next: (regions) => this.uniqueRegions = regions,
          error: (error) => {
            console.error('Erreur lors du chargement des régions:', error);
            this.uniqueRegions = [];
          }
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

    if (this.searchValue.trim()) {
      const searchTerm = this.searchValue.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    if (this.selectedRegion) {
      filtered = filtered.filter(product =>
        product.region.toString() === this.selectedRegion
      );
    }

    this.products = filtered;
    this.first = 0;
  }

  // Méthodes utilitaires
  public trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}