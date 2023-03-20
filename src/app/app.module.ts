import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { VoltarComponent } from './voltar/voltar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ConfiguracoesComponent,
    VoltarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
