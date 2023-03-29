import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BancoService } from '../bancos';

export type FormularioEditarBanco = {
	id: number
	nome: string,
	icone: string,
	posicao: number
}

@Component({
	selector: 'app-editar-banco',
	templateUrl: './editar-banco.component.html',
	styleUrls: ['./editar-banco.component.scss']
})
export class EditarBancoComponent {
	@Input() dialogOpen: boolean = false
	@Input() formulario!: FormularioEditarBanco

	@Output() dialogOpenChange = new EventEmitter<boolean>()

	constructor(private BancoService: BancoService) { }

	fecharDialog() {
		this.dialogOpen = false
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async editarBanco() {
		if (!this.validarFormulario()) {
			alert("Preencha ao menos o Nome continuar")
			return
		}
		let sucesso = await this.BancoService.atualizarBanco(this.formulario.id, {
			nome: this.formulario.nome,
			icone: this.formulario.icone,
			posicao: this.formulario.posicao
		})

		if (!sucesso) return

		alert("Banco atualizado com sucesso!")
		this.fecharDialog()
	}

	validarFormulario() {
		if (!this.formulario.nome) return false

		return true
	}
}
