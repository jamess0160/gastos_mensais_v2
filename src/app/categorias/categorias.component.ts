import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GastoService } from '../gastos';
import Gasto from '../gastos/gasto.model';
import utils from '../utils';

type Categorias = {
	Geral: Gasto[],
	Transporte: Gasto[],
	Alimentacao: Gasto[]
}

type CategoriasTotal = {
	Geral: string,
	Transporte: string,
	Alimentacao: string
}

@Component({
	selector: 'app-categorias',
	templateUrl: './categorias.component.html',
	styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
	constructor(
		private gastosAPI: GastoService,
		private route: ActivatedRoute) { }

	tipoCategoria: number = 1
	banco: number = 1

	tileGeral: boolean = true
	tileTransporte: boolean = false
	tileAlimentacao: boolean = false

	classeTiles: string[] = [
		"animarEntrar-E-D",
		"animarEntrar-D-E",
		"animarEntrar-D-E",
	]

	gastos: Categorias = {
		Geral: [],
		Transporte: [],
		Alimentacao: []
	}

	total: CategoriasTotal = {
		Geral: "00,00",
		Transporte: "00,00",
		Alimentacao: "00,00",
	}

	ngOnInit() {
		this.banco = parseInt(this.route.snapshot.params['banco'])

		utils.callInterval(this.atualizarTabela, 2000, "Ocorreu um erro ao atualizar a tabela", this)
	}

	async atualizarTabela() {
		let dados = await this.gastosAPI.listarGastos(this.banco, this.tipoCategoria)

		this.gastos = this.tratarCategorias(dados)
		this.total = this.tratarCategoriasTotal(dados)
	}

	tratarCategorias(dados: Gasto[]): Categorias {
		let dadosGeral = dados.filter((item) => item.tipo === 1)
		let dadosTransporte = dados.filter((item) => item.tipo === 2)
		let dadosAlimentacao = dados.filter((item) => item.tipo === 3)

		return {
			Geral: this.tratarEspacosVazios(dadosGeral),
			Transporte: this.tratarEspacosVazios(dadosTransporte),
			Alimentacao: this.tratarEspacosVazios(dadosAlimentacao)
		}
	}

	tratarEspacosVazios(dados: Gasto[]): Gasto[] {
		if (dados.length > 10) {
			return dados
		}

		let loopCount = 10 - dados.length

		for (let i = 0; i < loopCount; i++) {
			dados.push({ id: 0, data_registro: "" })
		}

		return dados
	}

	tratarCategoriasTotal(dados: Gasto[]): CategoriasTotal {
		let dadosGeral = dados.filter((item) => item.tipo === 1)
		let dadosTransporte = dados.filter((item) => item.tipo === 2)
		let dadosAlimentacao = dados.filter((item) => item.tipo === 3)

		return {
			Geral: dadosGeral.reduce((anterior, atual) => anterior + (atual.valor || 0), 0).toFixed(2),
			Transporte: dadosTransporte.reduce((anterior, atual) => anterior + (atual.valor || 0), 0).toFixed(2),
			Alimentacao: dadosAlimentacao.reduce((anterior, atual) => anterior + (atual.valor || 0), 0).toFixed(2)
		}
	}

	async confirmarDelete(id: number) {
		if (!confirm("Você deseja mesmo deletar esse registro?")) {
			return
		}

		await this.gastosAPI.deletarGasto(id)
		this.atualizarTabela()
	}

	async mudarPagina(parametro: number) {
		this.tipoCategoria += parametro

		if (this.tipoCategoria === 1) {
			this.classeTiles[0] = "animarEntrar-E-D"
			this.classeTiles[1] = "animarSair-D"

			await utils.sleep(200)

			this.tileGeral = true
			this.tileTransporte = false
			this.tileAlimentacao = false
		}

		if (this.tipoCategoria === 2) {
			this.classeTiles[0] = "animarSair-E"
			this.classeTiles[1] = parametro === 1 ? "animarEntrar-D-E" : "animarEntrar-E-D"
			this.classeTiles[2] = "animarSair-D"

			await utils.sleep(200)

			this.tileGeral = false
			this.tileTransporte = true
			this.tileAlimentacao = false
		}

		if (this.tipoCategoria === 3) {
			this.classeTiles[1] = "animarSair-E"
			this.classeTiles[2] = "animarEntrar-D-E"

			await utils.sleep(200)

			this.tileGeral = false
			this.tileTransporte = false
			this.tileAlimentacao = true
		}

		this.atualizarTabela()
	}
}
