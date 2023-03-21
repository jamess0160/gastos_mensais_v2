import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { VoltarComponent } from './voltar/voltar.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { GastoService } from './gastos';
import { EntradaService } from './entradas';
import { BancoService } from './bancos';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ConfiguracoesComponent,
    VoltarComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GastoService,
    EntradaService,
    BancoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
