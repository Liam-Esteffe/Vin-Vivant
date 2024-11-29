import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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