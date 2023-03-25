import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Banco, BancoService } from '../bancos';

type Formulario = {
	nome: string,
	icone: string,
	posicao: string
}

@Component({
	selector: 'app-adicionar-banco',
	templateUrl: './adicionar-banco.component.html',
	styleUrls: ['./adicionar-banco.component.scss']
})
export class AdicionarBancoComponent {
	@Input() dialogOpen: boolean = false
	@Output() dialogOpenChange = new EventEmitter<boolean>()

	constructor(private BancoService: BancoService) { }

	bancos: Banco[] = []
	formulario: Formulario = {
		nome: "",
		icone: "",
		posicao: ""
	}

	fecharDialog() {
		this.dialogOpen = false
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async registrarBanco() {
		if (!this.validarFormulario()) {
			alert("Preencha ao menos o Nome continuar")
			return
		}
		let sucesso = await this.BancoService.inserirBanco({
			nome: this.formulario.nome,
			icone: this.formulario.icone,
			posicao: parseInt(this.formulario.posicao)
		})

		if (!sucesso) return

		alert("Banco inserido com sucesso!")
		this.fecharDialog()
	}

	validarFormulario() {
		if (!this.formulario.nome) return false

		return true
	}
}
