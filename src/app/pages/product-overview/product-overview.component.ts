import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vin } from '../../interfaces/vin.interface';
import { Product } from '../../interfaces/product.interface';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CartItem, CartService } from '../../cart.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrl: './product-overview.component.scss'
})
export class ProductOverviewComponent {
  receivedData: Product | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private primengConfig: PrimeNGConfig,
    private messageService: MessageService, private cartService: CartService) { }

  ngOnInit(): void {
    this.receivedData = history.state.data;
  }


  showToast() {

    if (this.receivedData?.in_stock === true) {
      this.messageService.add({
        severity: 'success', // Type de toast ('success', 'info', 'warn', 'error')
        summary: 'Succès',
        detail: 'Le produit à bien été ajouté à votre panier !'
      });
      this.addToCart(this.receivedData)
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
