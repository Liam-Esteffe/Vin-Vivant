import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer/beer.component';
import { HomeComponent } from './home/home.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {HttpClientModule} from "@angular/common/http";
import { VinComponent } from './vin/vin.component';
import { SharedModule } from "../shared/shared.module";
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { SpiritueuxComponent } from './spiritueux/spiritueux.component';
import { EpicerieComponent } from './epicerie/epicerie.component';
import { CadeauxComponent } from './cadeaux/cadeaux.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomicileComponent } from './degustations/domicile/domicile.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    BeerComponent,
    HomeComponent,
    VinComponent,
    CartComponent,
    ProductOverviewComponent,
    SpiritueuxComponent,
    EpicerieComponent,
    CadeauxComponent,
    DomicileComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    FloatLabelModule,
    SharedModule,
    PaginatorModule
],
providers: [MessageService]
})
export class PagesModule { }
