import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Banco, BancoService } from '../bancos';
import { GastoService } from '../gastos';
import utils from '../utils';
import { tiposCheckBox } from '../adicionar/adicionar.component';

export type FormularioEditarGasto = {
	id: number,
	data_registro: string,
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

const DEFAULT_FORM: FormularioEditarGasto = {
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

@Component({
	selector: 'app-editar',
	templateUrl: './editar.component.html',
	styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
	@Input() dialogOpen: boolean = false
	@Input() formulario: FormularioEditarGasto = { ...DEFAULT_FORM }

	@Output() dialogOpenChange = new EventEmitter<boolean>()
	@Output() formularioChange = new EventEmitter<FormularioEditarGasto>()

	constructor(private BancoService: BancoService, private GastosService: GastoService) { }

	bancos: Banco[] = []
	classesDialog = ['dialog']
	erroFormulario = false
	campoObrigatorio!: any

	ngOnInit() {
		this.carregarBancos().catch((error) => {
			alert(error.toString())
			console.error(error)
		})
	}

	async carregarBancos() {
		this.bancos = await this.BancoService.listarBancos()
	}

	fecharDialog() {
		this.dialogOpen = false
		this.formulario = { ...DEFAULT_FORM }

		this.formularioChange.emit(this.formulario)
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async editarGasto() {
		if (!this.validarFormulario()) {
			this.erroForm()
			return
		}
		let sucesso = await this.GastosService.atualizarGasto(this.formulario.id, {
			data_registro: this.formulario.data_registro,
			data_gasto: this.formulario.data || null,
			banco_id: parseInt(this.formulario.banco),
			descricao: this.formulario.descricao,
			parcela_atual: this.formulario.parcela_atual || null,
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
		this.fecharDialog()
	}

	checkBoxMudou(tipo: tiposCheckBox, event: Event) {
		this.formulario.padrao = false
		this.formulario.parcela = false
		this.formulario.fixo = false

		delete this.formulario.parcela_atual
		delete this.formulario.parcelas_totais

		let input = event.target as HTMLInputElement

		this.formulario[tipo] = input.checked
	}
}
