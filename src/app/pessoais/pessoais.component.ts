import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Banco, BancoService } from '../bancos';
import { FormularioEditarGasto } from '../editar/editar.component';
import { Gasto, GastoService } from '../gastos';
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
	selector: 'app-pessoais',
	templateUrl: './pessoais.component.html',
	styleUrls: ['./pessoais.component.scss']
})
export class PessoaisComponent implements OnInit {
	constructor(
		private gastosAPI: GastoService,
		private route: ActivatedRoute,
	) { }

	tipoCategoria: number = parseInt(this.route.snapshot.params['categoria'])

	tipos_destinos = {
		1: "Geral",
		2: "Tiago",
		3: "Luana"
	}

	destino = parseInt(this.route.snapshot.params['destino']) as keyof typeof this.tipos_destinos

	destinoString = this.tipos_destinos[this.destino]

	tileGeral: boolean = this.tipoCategoria === 1
	tileTransporte: boolean = this.tipoCategoria === 2
	tileAlimentacao: boolean = this.tipoCategoria === 3

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

	dialogEditar: boolean = false
	editarForm: FormularioEditarGasto = {
		id: 0,
		data_registro: "",
		descricao: "",
		valor: 0,
		tipo: "",
		banco: "",
		padrao: false,
		parcela: false,
		fixo: false,
		destino: ""
	}

	resolveDelete: any
	dialogDelete = false

	async ngOnInit() {
		utils.callInterval(this.atualizarTabela, 2000, "Ocorreu um erro ao atualizar a tabela", this)
	}

	async atualizarTabela() {
		let localMes = localStorage.getItem("mes")
		let localAno = localStorage.getItem("ano")

		let mes = localMes ? parseInt(localMes) : undefined
		let ano = localAno ? parseInt(localAno) : undefined

		if (this.destino === 1) {
			let dados = await this.gastosAPI.listarGastosPessoais(this.destino, this.tipoCategoria, mes, ano)
			this.gastos = this.tratarCategorias(dados)
			this.total = this.tratarCategoriasTotal(dados)
			return
		}

		let [dados, conjunto] = await Promise.all([
			this.gastosAPI.listarGastosPessoais(this.destino, this.tipoCategoria, mes, ano),
			this.gastosAPI.listarGastosPessoais(4, this.tipoCategoria, mes, ano)
		])

		conjunto.forEach((item) => {
			dados.push(item)
		})

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
		let dadosGeral = dados.filter((item) => item.tipo === 1 && item.active === 1 && !item.descricao?.includes("*"))
		let dadosTransporte = dados.filter((item) => item.tipo === 2 && item.active === 1 && !item.descricao?.includes("*"))
		let dadosAlimentacao = dados.filter((item) => item.tipo === 3 && item.active === 1 && !item.descricao?.includes("*"))

		return {
			Geral: dadosGeral.reduce((anterior, atual) => anterior + (atual.valor || 0), 0).toFixed(2),
			Transporte: dadosTransporte.reduce((anterior, atual) => anterior + (atual.valor || 0), 0).toFixed(2),
			Alimentacao: dadosAlimentacao.reduce((anterior, atual) => anterior + (atual.valor || 0), 0).toFixed(2)
		}
	}

	async confirmarDelete(id?: number) {
		if (!id) {
			return
		}
		this.dialogDelete = true
		let confirmDelete = await new Promise((resolve) => this.resolveDelete = resolve)
		this.dialogDelete = false

		if (!confirmDelete) {
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

	editar(itemEditar: Gasto) {
		this.dialogEditar = true

		if (itemEditar.fixo) {
			this.editarForm.fixo = true
		}

		if (itemEditar.data_gasto) this.editarForm.data = moment(itemEditar.data_gasto, "DD/MM/YYYY").format('YYYY-MM-DD')
		if (itemEditar.banco_id) this.editarForm.banco = itemEditar.banco_id.toString()
		if (itemEditar.descricao) this.editarForm.descricao = itemEditar.descricao
		if (itemEditar.destino) this.editarForm.destino = itemEditar.destino.toString()

		if (itemEditar.parcela_atual && itemEditar.parcelas_totais) {
			this.editarForm.parcela_atual = itemEditar.parcela_atual
			this.editarForm.parcelas_totais = itemEditar.parcelas_totais
			this.editarForm.parcela = true
		}

		if (itemEditar.tipo) this.editarForm.tipo = itemEditar.tipo.toString()
		if (itemEditar.valor) this.editarForm.valor = itemEditar.valor
		if (itemEditar.data_registro) this.editarForm.data_registro = moment(itemEditar.data_registro).format('YYYY-MM-DD')
		if (itemEditar.id) this.editarForm.id = itemEditar.id

		if (!this.editarForm.parcela && !this.editarForm.fixo) {
			this.editarForm.padrao = true
		}
	}

	tratarData(item: Gasto) {
		if (!item.id) {
			return ""
		}

		if (item.parcela_atual) {
			let atual = ('00' + item.parcela_atual).slice(-2)
			let maximo = ('00' + item.parcelas_totais).slice(-2)
			return `(${atual}/${maximo})`
		}

		if (item.fixo) {
			return "Fixo"
		}

		return item.data_gasto
	}

	async changeActive(item: Gasto) {
		if (!item.id) {
			return
		}
		await this.gastosAPI.inativarGasto(item.id, !item.active)
		this.atualizarTabela()
	}
}
