import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;      // Identifiant unique
  name: string;    // Nom du vin
  price: number;   // Prix unitaire
  quantity: number; // Quantité dans le panier
  stock: boolean;  // Indique si le produit est en stock
  get_image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable pour suivre les changements du panier
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(item: CartItem): void {
    if (!item.stock) {
      alert('Ce produit est en rupture de stock.');
      return;
    }

    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }

    this.updateCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.id === productId);
    if (item) {
      if (item.stock && quantity > 0) {
        item.quantity = quantity;
      } else {
        alert('Produit non disponible ou quantité invalide.');
      }
    }
    this.updateCart();
  }
  
  clearCart(): void {
    this.cartItems = []; // Vider le tableau du panier
    this.updateCart(); // Mettre à jour le sujet et le localStorage
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }
}