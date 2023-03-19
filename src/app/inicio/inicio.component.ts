import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  bancos = [
    {
      id: 1,
      nome: "",
      cor: "#8A05BE",
      totais: {
        alimentacao: 500,
        transportes: 500,
        geral: 500,
      }
    },
    {
      id: 2,
      nome: "Teste",
      cor: "#8A05BE",
      totais: {
        alimentacao: 500,
        transportes: 500,
        geral: 500,
      }
    },
    {
      id: 3,
      nome: "Teste",
      cor: "#8A05BE",
      totais: {
        alimentacao: 500,
        transportes: 500,
        geral: 500,
      }
    }
  ]

  abrirAdicionar(){
    alert("adicionar")
  }
}
