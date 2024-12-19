import { Component } from '@angular/core';
import { slideInAnimation } from './animations/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'Le Vin Vivant';
  isLoading = true; // Loader actif au départ
  isLoaderHidden = false; // Permet d'appliquer la classe d'animation

  constructor() {
    this.waitForImagesToLoad()
  }

  waitForImagesToLoad(): void {
    const images = Array.from(document.images); // Récupérer toutes les images de la page
    const promises = images.map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true); // Résoudre même si une image échoue
        }
      });
    });

    // Attendre que toutes les promesses soient résolues
    Promise.all(promises).then(() => {
      setTimeout(() => {
        this.isLoading = false; // Désactiver le loader après 1 seconde
      }, 1000); // Ajout d'un délai pour la transition
    });
  }

  prepareRoute(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  onPageLoad(): void {
    this.isLoaderHidden = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // Attente de 1 seconde avant de désactiver le loader
  }
}
