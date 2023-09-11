import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Banco, BancoService } from '../bancos';
import { GastoService } from '../gastos';
import utils from '../utils';

type FormularioAdicionarGasto = {
	data_registro?: string
	data?: string,
	descricao: string,
	parcela_atual?: number,
	parcelas_totais?: number,
	valor: number,
	tipo: string,
	banco: string,
	padrao: boolean,
	parcela: boolean,
	fixo: boolean,
	destino: string
}

const DEFAULT_FORM: FormularioAdicionarGasto = {
	descricao: "",
	valor: 0,
	tipo: "",
	banco: "",
	padrao: false,
	parcela: false,
	fixo: false,
	destino: ""
}

@Component({
	selector: 'app-adicionar',
	templateUrl: './adicionar.component.html',
	styleUrls: ['./adicionar.component.scss']
})
export class AdicionarComponent implements OnInit {
	@Input() dialogOpen: boolean = false
	@Output() dialogOpenChange = new EventEmitter<boolean>()

	constructor(private BancoService: BancoService, private GastosService: GastoService) { }

	bancos: Banco[] = []
	formulario: FormularioAdicionarGasto = { ...DEFAULT_FORM }
	classesDialog = ['dialog']
	erroFormulario = false
	campoObrigatorio!: any

	ngOnInit() {
		this.carregarBancos()
	}

	async carregarBancos() {
		this.bancos = await this.BancoService.listarBancos()
	}

	fecharDialog() {
		this.dialogOpen = false
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async registrarGasto() {
		if (!this.validarFormulario()) {
			this.erroForm()
			return
		}

		console.log(this.formulario.data, this.formulario.data_registro)

		let sucesso = await this.GastosService.inserirGasto({
			data_registro: this.formulario.data_registro,
			data_gasto: this.formulario.data,
			banco_id: parseInt(this.formulario.banco),
			descricao: this.formulario.descricao,
			parcela_atual: this.formulario.parcela_atual,
			parcelas_totais: this.formulario.parcelas_totais,
			valor: this.formulario.valor,
			tipo: parseInt(this.formulario.tipo),
			destino: parseInt(this.formulario.destino),
			fixo: this.formulario.fixo
		})

		if (!sucesso) {
			this.erro()
			return
		}

		this.sucesso()
	}

	validarFormulario() {
		if (!this.formulario.banco) return false
		if (!this.formulario.descricao) return false
		if (!this.formulario.valor) return false
		if (!this.formulario.tipo) return false

		if (
			this.formulario.padrao === false &&
			this.formulario.parcela === false &&
			this.formulario.fixo === false
		) return false

		if (this.formulario.parcela_atual && !this.formulario.parcela_atual) return false
		if (!this.formulario.parcela_atual && this.formulario.parcela_atual) return false

		this.erroFormulario = false
		return true
	}

	async erro() {
		this.classesDialog[1] = 'animarErro'
		await utils.sleep(1000)
		this.classesDialog[1] = 'erroEstatico'
	}

	async erroForm() {
		this.classesDialog[1] = 'animarErro'
		this.erroFormulario = true
		this.campoObrigatorio = { borderColor: "red" }
		await utils.sleep(1000)
		this.classesDialog[1] = 'erroEstatico'
	}

	async sucesso() {
		this.campoObrigatorio = null
		this.classesDialog[1] = 'animarSucesso'
		await utils.sleep(1000)
		this.classesDialog[1] = ''
		this.formulario = { ...DEFAULT_FORM }
	}

	checkBoxMudou(tipo: tiposCheckBox, event: Event) {
		let input = event.target as HTMLInputElement

		this.formulario.padrao = false
		this.formulario.parcela = false
		this.formulario.fixo = false

		this.formulario[tipo] = input.checked
	}
}

type tiposCheckBox = "padrao" | "parcela" | "fixo"
