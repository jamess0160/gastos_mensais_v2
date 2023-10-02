import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntradaService } from '../entradas';

export type FormularioEditarEntrada = {
	id: number,
	tipo: number,
	nome: string,
	valor: number
}

const DEFAULT_FORM: FormularioEditarEntrada = {
	id: 0,
	tipo: 0,
	nome: "",
	valor: 0,
}

@Component({
	selector: 'app-editar-entrada',
	templateUrl: './editar-entrada.component.html',
	styleUrls: ['./editar-entrada.component.scss']
})
export class EditarEntradaComponent {
	@Input() dialogOpen: boolean = false
	@Output() dialogOpenChange = new EventEmitter<boolean>()
	@Input() formulario: FormularioEditarEntrada = { ...DEFAULT_FORM }

	constructor(private EntradaService: EntradaService) { }

	fecharDialog() {
		this.dialogOpen = false
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async editarEntrada() {
		if (!this.validarFormulario()) {
			alert("Preencha os campos para continuar")
			return
		}
		let sucesso = await this.EntradaService.atualizarEntrada(this.formulario.id, {
			tipo_id: this.formulario.tipo,
			nome: this.formulario.nome,
			valor: this.formulario.valor,
		})

		if (!sucesso) return

		alert("Entrada atualizada com sucesso!")
		this.fecharDialog()
	}

	validarFormulario() {
		if (!this.formulario.tipo) return false
		if (!this.formulario.valor) return false

		return true
	}
}
