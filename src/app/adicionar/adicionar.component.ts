import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Banco, BancoService } from '../bancos';
import { GastoService } from '../gastos';

type FormularioAdicionarGasto = {
	data?: string,
	descricao: string,
	parcela_atual?: number,
	parcelas_totais?: number,
	valor: number,
	tipo: string,
	banco: string
}

const DEFAULT_FORM = {
	descricao: "",
	valor: 0,
	tipo: "",
	banco: ""
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
	formulario: FormularioAdicionarGasto = { ...DEFAULT_FORM }

	ngOnInit() {
		this.carregarBancos()
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
			parcela_atual: this.formulario.parcela_atual,
			parcelas_totais: this.formulario.parcelas_totais,
			valor: this.formulario.valor,
			tipo: parseInt(this.formulario.tipo)
		})

		if (!sucesso) return

		alert("Gasto inserido com sucesso!")
		this.fecharDialog()
		this.formulario = { ...DEFAULT_FORM }
	}

	validarFormulario() {
		if (!this.formulario.banco) return false
		if (!this.formulario.descricao) return false
		if (!this.formulario.valor) return false
		if (!this.formulario.tipo) return false

		return true
	}
}
