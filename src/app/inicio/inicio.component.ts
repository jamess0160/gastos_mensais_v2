import { Component, OnInit } from '@angular/core';
import { BancoService, Tile } from '../bancos';
import { EntradaService } from '../entradas';
import utils from '../utils';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

    constructor(private BancoService: BancoService, private EntradaService: EntradaService) { }

    meses: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    diaAtual: number = new Date().getDate()
    mesAtual: string = this.meses[new Date().getMonth()]
    anoAtual: number = new Date().getFullYear()

    dialogGasto = false
    dialogBanco = false

    bancos: Tile[] = []
    totalGastos: string = ""
    totalEntradas: string = ""
    restante: string = ""

    ngOnInit() {
        utils.callInterval(this.carregarDados, 2000, "Ocorreu um erro ao carregar os dados", this)
    }

    async carregarDados() {
        this.bancos = await this.BancoService.listarGastoPorBancos()
        let entradas = await this.EntradaService.listarEntradasMes()

        this.totalGastos = this.bancos.reduce((anterior, atual) => anterior + atual.total, 0).toFixed(2)
        this.totalEntradas = entradas.reduce((anterior, atual) => anterior + atual.valor, 0).toFixed(2)
        this.restante = (parseInt(this.totalEntradas) - parseInt(this.totalGastos)).toFixed(2)
    }

    abrirAdicionar() {
        this.dialogGasto = true
    }

    abrirAdicionarBanco(){
        this.dialogBanco = true
    }
}
