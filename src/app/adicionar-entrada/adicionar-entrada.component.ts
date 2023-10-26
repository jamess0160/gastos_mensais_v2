import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntradaService } from '../entradas';
import * as moment from 'moment';

type FormularioAdicionarEntrada = {
	tipo: number,
	nome: string
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
		nome: "",
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

		let localMes = localStorage.getItem("mes")
		let localAno = localStorage.getItem("ano")

		let mes = localMes ? parseInt(localMes) : (moment().month() + 1)
		let ano = localAno ? parseInt(localAno) : moment().year()

		let sucesso = await this.EntradaService.inserirEntrada({
			tipo_id: this.formulario.tipo,
			nome: this.formulario.nome,
			valor: this.formulario.valor,
			data_registro: moment().set("month", (mes - 1)).set("year", ano).format("YYYY-MM-DD hh:mm:ss")
		})

		if (!sucesso) return

		alert("Entrada inserida com sucesso!")
		this.fecharDialog()

		this.formulario = {
			tipo: 0,
			nome: "",
			valor: 0,
		}

	}

	validarFormulario() {
		if (!this.formulario.tipo) return false
		if (!this.formulario.valor) return false

		return true
	}
}
