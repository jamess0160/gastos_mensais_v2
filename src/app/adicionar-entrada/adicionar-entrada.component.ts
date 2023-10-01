import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntradaService } from '../entradas';

type FormularioAdicionarEntrada = {
	tipo: number,
	valor: number
}

@Component({
	selector: 'app-adicionar-entrada',
	templateUrl: './adicionar-entrada.component.html',
	styleUrls: ['./adicionar-entrada.component.scss']
})
export class AdicionarEntradaComponent {
	@Input() dialogOpen: boolean = false
	@Output() dialogOpenChange = new EventEmitter<boolean>()

	constructor(private EntradaService: EntradaService) { }

	formulario: FormularioAdicionarEntrada = {
		tipo: 0,
		valor: 0,
	}

	fecharDialog() {
		this.dialogOpen = false
		this.dialogOpenChange.emit(this.dialogOpen)
	}

	async registrarEntrada() {
		if (!this.validarFormulario()) {
			alert("Preencha os campos para continuar")
			return
		}
		let sucesso = await this.EntradaService.inserirEntrada({
			tipo_id: this.formulario.tipo,
			valor: this.formulario.valor,
		})

		if (!sucesso) return

		alert("Entrada inserida com sucesso!")
		this.fecharDialog()

		this.formulario = {
			tipo: 0,
			valor: 0,
		}

	}

	validarFormulario() {
		if (!this.formulario.tipo) return false
		if (!this.formulario.valor) return false

		return true
	}
}
