import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BancoService } from '../bancos';

type FormularioAdicionarBanco = {
	nome: string,
	icone?: string,
	posicao?: number
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

	formulario: FormularioAdicionarBanco = {
		nome: ""
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
			posicao: this.formulario.posicao
		})

		if (!sucesso) return

		alert("Banco inserido com sucesso!")
		this.fecharDialog()

		this.formulario = {
			nome: ""
		}

	}

	validarFormulario() {
		if (!this.formulario.nome) return false

		return true
	}
}
