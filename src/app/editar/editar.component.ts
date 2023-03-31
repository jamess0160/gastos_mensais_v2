import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Banco, BancoService } from '../bancos';
import { GastoService } from '../gastos';

export type FormularioEditarGasto = {
	id: number
	data: string,
	descricao: string,
	parcela_atual: number,
	parcelas_totais: number,
	valor: number,
	tipo: string,
	banco: string
}

const DEFAULT_FORM = {
	id: 0,
	data: "",
	descricao: "",
	parcela_atual: 0,
	parcelas_totais: 0,
	valor: 0,
	tipo: "",
	banco: ""
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
			alert("Preencha todos os campos para continuar")
			return
		}
		let sucesso = await this.GastosService.atualizarGasto(this.formulario.id, {
			data_gasto: this.formulario.data,
			banco_id: parseInt(this.formulario.banco),
			descricao: this.formulario.descricao,
			parcela_atual: this.formulario.parcela_atual,
			parcelas_totais: this.formulario.parcelas_totais,
			valor: this.formulario.valor,
			tipo: parseInt(this.formulario.tipo)
		})

		if (!sucesso) return

		alert("Gasto atualizado com sucesso!")
		this.fecharDialog()
	}

	validarFormulario() {
		if (!this.formulario.banco) return false
		if (!this.formulario.descricao) return false
		if (!this.formulario.valor) return false
		if (!this.formulario.tipo) return false

		return true
	}
}
