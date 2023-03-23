import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BancoService } from '../bancos';
import Banco from '../bancos/banco.model';
import { GastoService } from '../gastos';

type Formulario = {
	data: string,
	descricao: string,
	valor: number,
	tipo: string,
	banco: string
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
	formulario: Formulario = {
		data: "",
		descricao: "",
		valor: 0,
		tipo: "",
		banco: ""
	}

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
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async registrarGasto() {
		if (!this.validarFormulario()) {
			alert("Preencha todos os campos para continuar")
			return
		}
		let sucesso = await this.GastosService.inserirGasto({
			data_gasto: this.formulario.data,
			banco_id: parseInt(this.formulario.banco),
			descricao: this.formulario.descricao,
			valor: this.formulario.valor,
			tipo: parseInt(this.formulario.tipo)
		})

		if (!sucesso) return

		alert("Gasto inserido com sucesso!")
		this.fecharDialog()
	}

	validarFormulario() {
		if (!this.formulario.data) return false
		if (!this.formulario.banco) return false
		if (!this.formulario.descricao) return false
		if (!this.formulario.valor) return false
		if (!this.formulario.tipo) return false

		return true
	}
}
