import { Component, OnInit } from '@angular/core';
import { BancoService } from '../bancos';
import { Tile } from '../bancos/banco.model';
import { EntradaService } from '../entradas';
import utils from '../utils';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

    constructor(private BancoService: BancoService, private EntradaService: EntradaService) { }

    dialogOpen = false

    bancos: Tile[] = []
    totalGastos: string = ""
    totalEntradas: string = ""
    restante: string = ""

    ngOnInit() {
        utils.callInterval(this.carregarDados, 2000, "Ocorreu um erro ao carregar os dados", this)
    }

    async carregarDados() {
        let dadosBancos = await this.BancoService.listarGastoPorBancos()
        let entradas = await this.EntradaService.listarEntradasMes()

        this.totalGastos = dadosBancos.reduce((anterior, atual) => anterior + atual.total, 0).toFixed(2)
        this.totalEntradas = entradas.reduce((anterior, atual) => anterior + atual.valor, 0).toFixed(2)
        this.restante = (parseInt(this.totalEntradas) - parseInt(this.totalGastos)).toFixed(2)

        this.bancos = [
            {
                id: 0,
                nome: "",
                total: 0,
                totais: {
                    geral: dadosBancos.reduce((anterior, atual) => anterior + parseInt(atual.totais.geral), 0).toFixed(2),
                    transportes: dadosBancos.reduce((anterior, atual) => anterior + parseInt(atual.totais.transportes), 0).toFixed(2),
                    alimentacao: dadosBancos.reduce((anterior, atual) => anterior + parseInt(atual.totais.alimentacao), 0).toFixed(2)
                }
            },
            ...dadosBancos
        ]
    }

    abrirAdicionar() {
        this.dialogOpen = true
    }
}
