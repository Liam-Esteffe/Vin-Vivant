import {
    trigger,
    transition,
    style,
    animate,
    query,
    group
  } from '@angular/animations';
  
  export const slideInAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 0,
        })
      ], { optional: true }),
  
      query(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.9) translateY(20px)', // Départ en bas légèrement réduit
        })
      ], { optional: true }),
  
      group([
        query(':leave', [
          animate('400ms ease-in', style({
            opacity: 0,
            transform: 'scale(1.1) translateY(-20px)' // Zoom léger en partant vers le haut
          }))
        ], { optional: true }),
        query(':enter', [
          animate('400ms ease-out', style({
            opacity: 1,
            transform: 'scale(1) translateY(0)' // Arrive à sa taille normale
          }))
        ], { optional: true }),
      ])
    ])
  ]);