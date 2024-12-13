import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  // Fonction pour ouvrir ou fermer le menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    // Empêche le défilement lorsque le menu est ouvert
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // Fonction pour fermer le menu lorsqu'un lien est cliqué
  closeMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}