import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { CartService, CartItem } from '../../cart.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-cadeaux',
  templateUrl: './cadeaux.component.html',
  styleUrl: './cadeaux.component.scss'
})
export class CadeauxComponent {
  public price : string = "";

  constructor( private router: Router, private primengConfig: PrimeNGConfig,
    private messageService: MessageService, private cartService: CartService) {}

  showToast() {
    const product: Product = {
      name: "Carte Cadeaux",
      alcool_degree: 0,
      description: "Carte Cadeaux",
      capacity: 0,
      get_absolute_url: "https://cdn-icons-png.flaticon.com/512/874/874582.png",
      get_image: "https://cdn-icons-png.flaticon.com/512/874/874582.png",
      get_thumbnail: "https://cdn-icons-png.flaticon.com/512/874/874582.png",
      id: 9899998,
      in_stock: true,
      price: this.price,
      region: 0,
      types: []
    }
    if (parseInt(this.price) > 0) {
      this.messageService.add({
        severity: 'success', // Type de toast ('success', 'info', 'warn', 'error')
        summary: 'Succès',
        detail: 'Le produit à bien été ajouté à votre panier !'
      });
      this.addToCart(product);
    }

    else {
      this.messageService.add({
        severity: 'error', // Type de toast ('success', 'info', 'warn', 'error')
        summary: 'Erreur',
        detail: "Le produit n'est plus disponible pour le moment!"
      });
    }
  }

  public addToCart(item: Product): void {
    const cartItemMapped: CartItem = {
      id: item.id.toString(),
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1,
      stock: item.in_stock,
      get_image: item.get_image
    }
    this.cartService.addToCart(cartItemMapped)
  }
}
