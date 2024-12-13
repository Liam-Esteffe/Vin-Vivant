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
  alcool_degree: number;
  in_stock: boolean;
  get_image: string;
}

@Component({
  selector: 'app-epicerie',
  templateUrl: './epicerie.component.html',
  styleUrls: ['./epicerie.component.scss']
})
export class EpicerieComponent implements OnInit, OnDestroy {
  // Pagination
  public first: number = 0;
  public rows: number = 12;

  // Filtres
  public searchValue: string = '';

  // Données
  public products: Array<Product> = [];
  private allProducts: Array<Product> = [];

  // États
  public isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  // URLs API
  private readonly apiUrl: string = environment.apiUrl;
  private readonly EPICERIE_PRODUCTS_API = `${this.apiUrl}products/epicerie/`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchProducts(): void {
    this.isLoading = true;
    this.http.get<{products: Product[]}>(this.EPICERIE_PRODUCTS_API)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
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
  }

  // Gestionnaires d'événements
  public onSearchChange(): void {
    if (this.searchValue.trim() === '') {
      this.products = [...this.allProducts];
      return;
    }

    const searchTerm = this.searchValue.toLowerCase().trim();
    this.products = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
    this.first = 0;
  }

  public onPageChange(event: PaginatorState): void {
    this.isLoading = true;
    setTimeout(() => {
      this.first = event.first ?? 0;
      this.rows = event.rows ?? 12;
      this.isLoading = false;
    }, 300);
  }

  // Méthodes utilitaires
  public trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}