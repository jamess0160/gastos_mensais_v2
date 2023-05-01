import { Component, OnInit } from '@angular/core';
import { Banco, BancoService, Tile } from '../bancos';
import { FormularioEditarBanco } from '../editar-banco/editar-banco.component';
import { EntradaService } from '../entradas';
import utils from '../utils';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

    constructor(
        private BancoService: BancoService,
        private EntradaService: EntradaService
    ) { }

    meses: string[] = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    diaAtual: number = new Date().getDate()
    mesAtual: string = this.meses[new Date().getMonth()]
    anoAtual: number = new Date().getFullYear()

    dialogGasto = false
    dialogBanco = false
    dialogEditarBanco = false

    bancoSelecionado: FormularioEditarBanco = {
        id: 0,
        nome: "",
        icone: "",
        posicao: 0
    }

    tiles: Tile[] = []
    totalGastos: string = ""
    totalEntradas: string = ""
    restante: string = ""

    ngOnInit() {
        utils.callInterval(this.carregarDados, 2000, "Ocorreu um erro ao carregar os dados", this)
    }

    async carregarDados() {
        let localMes = localStorage.getItem("mes")
        let localAno = localStorage.getItem("ano")

        let mes = localMes ? parseInt(localMes) : undefined
        let ano = localAno ? parseInt(localAno) : undefined

        this.tiles = await this.BancoService.listarGastoPorBancos(mes, ano)
        let entradas = await this.EntradaService.listarEntradas(mes, ano)

        this.totalGastos = this.tiles.reduce((anterior, atual) => anterior + parseInt(atual.total), 0).toFixed(2)
        this.totalEntradas = entradas.reduce((anterior, atual) => anterior + atual.valor, 0).toFixed(2)
        this.restante = (parseInt(this.totalEntradas) - parseInt(this.totalGastos)).toFixed(2)
    }

    abrirAdicionar() {
        this.dialogGasto = true
    }

    abrirAdicionarBanco() {
        this.dialogBanco = true
    }

    editarBanco(event: Event, banco: Banco) {
        event.preventDefault()
        this.dialogEditarBanco = true

        if (banco.id) this.bancoSelecionado.id = banco.id
        if (banco.nome) this.bancoSelecionado.nome = banco.nome
        if (banco.icone) this.bancoSelecionado.icone = banco.icone
        if (banco.posicao) this.bancoSelecionado.posicao = banco.posicao
    }
}
