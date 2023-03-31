import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BancoService } from '../bancos';

export type FormularioEditarBanco = {
	id: number,
	nome: string,
	icone: string,
	posicao: number
}

const DEFAULT_FORM = {
	id: 0,
	nome: "",
	icone: "",
	posicao: 0
}

@Component({
	selector: 'app-editar-banco',
	templateUrl: './editar-banco.component.html',
	styleUrls: ['./editar-banco.component.scss']
})
export class EditarBancoComponent {
	@Input() dialogOpen: boolean = false
	@Input() formulario: FormularioEditarBanco = { ...DEFAULT_FORM }

	@Output() dialogOpenChange = new EventEmitter<boolean>()
	@Output() formularioChange = new EventEmitter<FormularioEditarBanco>()

	constructor(private BancoService: BancoService) { }

	fecharDialog() {
		this.dialogOpen = false
		this.formulario = { ...DEFAULT_FORM }

		this.dialogOpenChange.emit(this.dialogOpen)
		this.formularioChange.emit(this.formulario)
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

	async deletarBanco() {
		let conf = confirm(`Você deseja mesmo deletar o banco ${this.formulario.nome}?`)

		if (!conf) {
			return
		}

		let sucesso = await this.BancoService.deletarBanco(this.formulario.id)

		if (!sucesso) {
			return
		}
		alert("Banco deletado com sucesso!")
		this.fecharDialog()
	}
}
