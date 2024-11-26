import { Component } from '@angular/core';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrl: './beer.component.scss'
})
export class BeerComponent {

  beerLogos_1: string[] = ['pressure.png', 'lefthand.png', 'verdant.png', 'nothern.png', 'pomona.png',
                          'buxton.gif', 'cloudwater.jpeg', 'sureshot.png', 'theveil.png', 'uchu.jpeg', 'basqueland.jpg', 'brewski.png', 'caleya.jpg',
                          'fauve.png', 'ladebauche.jpeg', 'sauvage.jpeg', 'torrpen.jpg', 'papillon.png'];


  beerLogos_2: string[] = ['azvex.png', 'beak.jpg', 'deya.png', 'lostandgrounded.jpg', 'pollys.png',
  'vault.jpg', 'wiplash.png', 'garage.jpeg', 'north-brewing.jpg', 'tol.jpg', 'otherhalf.jpg', 'hoppy.jpeg', 'pophin.png', 'brasserie.jpg', 'cambier.jpg', 'urbaine.jpeg'];
  
  ngOnInit(): void {
    this.startSlider();
  }

  startSlider() {
    const slider = document.querySelector('.animate-slide') as HTMLElement; // Typage approprié
    const images = Array.from(slider.children) as HTMLElement[];
    let index = 0;

    // Détermine le nombre d'images pour le défilement
    const imageWidth = images[0].offsetWidth;
    const numberOfImages = images.length;
    
    setInterval(() => {
      index = (index + 1) % numberOfImages;
      slider.style.transform = `translateX(${-index * imageWidth}px)`;
    }, 3000); // Ajuste la durée selon tes besoins
  }

}
