import { Component } from '@angular/core';
import { CartService, CartItem } from '../../cart.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  total = 0;

  checkoutStatus: boolean = false;

  tabs = [
    { label: 'Coordonnées', active: true, unlocked: true },
    { label: 'Méthode de récupération', active: false, unlocked: false },
    { label: 'Validation', active: false, unlocked: false }
  ];

  activeTab = 0;
  userData = { name: '', email: '', phone: '' };
  pickupMethod = '';

  constructor(private cartService: CartService, private messageService: MessageService,) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  activateTab(index: number) {
    if (this.tabs[index].unlocked) {
      this.tabs.forEach((tab, i) => (tab.active = i === index));
      this.activeTab = index;
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  validateTab(index: number) {
    if (index < this.tabs.length - 1) {
      this.tabs[index + 1].unlocked = true;
      this.activateTab(index + 1);
    }
  }

  completeCheckout() {
    this.sendEmail();

    // Logique pour envoyer les données au backend
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  updateGift(): void {
    this.total += 3;
  }

  updateQuantity(productId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);

    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      alert('Quantité invalide.');
    }
  }

  private sendEmail(): void {
    const templateParams = {
      from_name: this.userData.email,
      user: {
        name: this.userData.name,
        email: this.userData.email,
        phone: this.userData.phone,
      },
      products: this.cartItems.map(item => ({
        image: item.get_image,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      order: {
        total_price: this.total,
        shipping_price: 0, // Exemple de frais de livraison
      }
    };
    emailjs.send('service_g5ho193', 'template_wpm5w8k', templateParams, '5i-b3vFg0Lk-AjFBh')
      .then(() => {
        // Si l'email a été envoyé avec succès, afficher le message de succès
        this.messageService.add({
          severity: 'success', // Type de toast
          summary: 'Succès',
          detail: 'La commande à bien été passé merci pour votre achat !'
        });
        this.cartService.clearCart();
        this.checkoutStatus = false;
      })
      .catch(() => {
        // En cas d'erreur lors de l'envoi d'email, afficher un message d'erreur
        this.messageService.add({
          severity: 'error', // Type de toast pour une erreur
          summary: 'Erreur', // Titre du message
          detail: 'Une erreur s\'est produite lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' // Détail du message
        });
      });
  }
}