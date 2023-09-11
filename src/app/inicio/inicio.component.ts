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
    localMes = localStorage.getItem("mes")

    diaAtual: number = new Date().getDate()
    mesAtual: string = this.meses[this.localMes ? parseInt(this.localMes) - 1 : new Date().getMonth()]
    anoAtual: string | number = localStorage.getItem("ano") || new Date().getFullYear()

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
    totalGastosInativos: string = ""
    totalEntradas: string = ""
    restante: string = ""
    restanteInativos: string = ""
    restanteLuana: string = ""
    restanteGeral: string = ""
    restanteTiago: string = ""

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

        this.totalGastosInativos = this.tiles.reduce((anterior, atual) => anterior + parseFloat(atual.totalInativos), 0).toFixed(2)
        this.totalGastos = this.tiles.reduce((anterior, atual) => anterior + parseFloat(atual.total), 0).toFixed(2)

        this.totalEntradas = entradas.reduce((anterior, atual) => anterior + atual.valor, 0).toFixed(2)

        this.restante = (parseFloat(this.totalEntradas) - parseFloat(this.totalGastos)).toFixed(2)
        this.restanteInativos = (parseFloat(this.totalEntradas) - parseFloat(this.totalGastosInativos)).toFixed(2)

        this.calcularGastosPessoais(mes, ano)
    }

    private async calcularGastosPessoais(mes?: number, ano?: number) {
        let restantePessoais = await this.BancoService.listarRestantesPessoais(mes, ano)

        this.restanteGeral = restantePessoais.geral.toFixed(2)
        this.restanteTiago = restantePessoais.tiago.toFixed(2)
        this.restanteLuana = restantePessoais.luana.toFixed(2)
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

    validarMes() {
        return Boolean(this.localMes) === false
    }
}
