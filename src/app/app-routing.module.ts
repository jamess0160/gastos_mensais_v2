import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { InicioComponent } from './inicio/inicio.component';
import { PessoaisComponent } from './pessoais/pessoais.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "inicio",
		pathMatch: "full"
	},
	{
		path: "inicio",
		component: InicioComponent
	},
	{
		path: "categorias/:banco/:categoria",
		component: CategoriasComponent
	},
	{
		path: "pessoais/:destino/:categoria",
		component: PessoaisComponent
	},
	{
		path: "configuracoes",
		component: ConfiguracoesComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
