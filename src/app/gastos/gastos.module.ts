import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastoService } from './shared';
import { CategoriasComponent } from '../categorias/categorias.component';

@NgModule({
  declarations: [
    CategoriasComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    GastoService
  ]
})
export class GastosModule { }
