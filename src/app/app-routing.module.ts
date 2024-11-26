import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path: "", pathMatch: "full", component: HomeComponent, title: "Accueil"
  },
  {
    path: "home", pathMatch: "full", component: HomeComponent, title: "Accueil"
  },
  {
    path: "cart", pathMatch: "full", component: CartComponent, title: "Mon Panier"
  },
  {
    path: "beer", component: BeerComponent, title: "Bières"
  },
  {
    path: "vin", component: VinComponent, title: "Vin"
  },
  {
    path: "spiritueux", component: SpiritueuxComponent, title: "Spiritueux"
  },
  {
    path: "epicerie", component: EpicerieComponent, title: "Epicerie"
  },
  {
    path: "cadeaux", component: CadeauxComponent, title: "Carte Cadeaux"
  },
  {
    path: "degustation/magasin", component: DomicileComponent, title: "Dégustation"
  },
  {
    path: "product-overview/:id", component: ProductOverviewComponent, title: "Produit"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
