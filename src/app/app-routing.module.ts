import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {BeerComponent} from "./pages/beer/beer.component";
import {HomeComponent} from "./pages/home/home.component";
import {VinComponent} from "./pages/vin/vin.component";
import { ProductOverviewComponent } from './pages/product-overview/product-overview.component';
import { SpiritueuxComponent } from './pages/spiritueux/spiritueux.component';
import { EpicerieComponent } from './pages/epicerie/epicerie.component';
import { CadeauxComponent } from './pages/cadeaux/cadeaux.component';
import { DomicileComponent } from './pages/degustations/domicile/domicile.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  {
    path: "", pathMatch: "full", component: HomeComponent, title: "Accueil", data: { animation: 'Page1' }
  },
  {
    path: "home", pathMatch: "full", component: HomeComponent, title: "Accueil", data: { animation: 'Page1' }
  },
  {
    path: "cart", pathMatch: "full", component: CartComponent, title: "Mon Panier", data: { animation: 'Page2' }
  },
  {
    path: "beer", component: BeerComponent, title: "Bières", data: { animation: 'Page2' }
  },
  {
    path: "vin", component: VinComponent, title: "Vin", data: { animation: 'Page2' }
  },
  {
    path: "spiritueux", component: SpiritueuxComponent, title: "Spiritueux", data: { animation: 'Page2' }
  },
  {
    path: "epicerie", component: EpicerieComponent, title: "Epicerie", data: { animation: 'Page2' }
  },
  {
    path: "cadeaux", component: CadeauxComponent, title: "Carte Cadeaux", data: { animation: 'Page2' }
  },
  {
    path: "degustation/magasin", component: DomicileComponent, title: "Dégustation", data: { animation: 'Page2' }
  },
  {
    path: "product-overview/:id", component: ProductOverviewComponent, title: "Produit", data: { animation: 'Page2' }
  },

];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // Active le scroll automatique en haut
  anchorScrolling: 'enabled',          // Permet de scroller vers des ancres (si utilisées)
  scrollOffset: [0, 0],                // Positionnement (x, y)
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
