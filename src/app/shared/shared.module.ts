import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterLinkActive, RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        NavbarComponent,
        SpinnerComponent
    ],
    exports: [
        NavbarComponent,
        SpinnerComponent,
    ],
    imports: [
        CommonModule,
        RouterLinkActive,
        RouterModule,
    ]
})
export class SharedModule { }
