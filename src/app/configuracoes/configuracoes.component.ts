import { Component, OnInit } from '@angular/core';
import { Entrada, EntradaService } from '../entradas';
import Utils from '../utils';
import { FormularioEditarEntrada } from '../editar-entrada/editar-entrada.component';
import * as moment from 'moment';

@Component({
	selector: 'app-configuracoes',
	templateUrl: './configuracoes.component.html',
	styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {
	mes: string = localStorage.getItem("mes") || (new Date().getMonth() + 1).toString()
	ano: string = localStorage.getItem("ano") || new Date().getFullYear().toString()
	entradas: (Entrada & { nome_tipo: string })[] = []

	dialogAdicionar = false
	dialogEditar = false

	dialogDelete = false
	resolveDelete: any

	dialogClonar = false
	resolveClonar: any

	formularioEditar: FormularioEditarEntrada = {
		id: 0,
		tipo: 0,
		nome: "",
		valor: 0
	}

	constructor(
		private EntradaService: EntradaService
	) { }

	ngOnInit(): void {
		Utils.callInterval(this.carregarEntradas, 2000, "Ocorreu um erro ao carregar os dados", this)
	}

	async carregarEntradas() {
		let localMes = localStorage.getItem("mes")
		let localAno = localStorage.getItem("ano")

		let mes = localMes ? parseInt(localMes) : undefined
		let ano = localAno ? parseInt(localAno) : undefined

		this.entradas = await this.EntradaService.listarEntradas(mes, ano)
	}

	adicionar() {
		this.dialogAdicionar = true
	}

	salvarData() {
		if (this.mes !== (new Date().getMonth() + 1).toString()) {
			localStorage.setItem("mes", this.mes || "")
		} else {
			localStorage.removeItem("mes")
		}

		if (this.ano !== new Date().getFullYear().toString()) {
			localStorage.setItem("ano", this.ano || "")
		} else {
			localStorage.removeItem("ano")
		}

		let msg = document.querySelector<HTMLDivElement>(".msg")

		if (!msg) return

		msg.style.display = "initial"

		setTimeout(() => {
			if (!msg) return
			msg.style.display = "none"
		}, 1500);
	}

	async editar(item: Entrada) {
		this.formularioEditar = {
			id: item.id,
			tipo: item.tipo_id,
			nome: item.nome,
			valor: item.valor
		}

		this.dialogEditar = true
	}

	async confirmarDelete(id: number) {
		this.dialogDelete = true
		let confirmDelete = await new Promise((resolve) => this.resolveDelete = resolve)
		this.dialogDelete = false

		if (!confirmDelete) {
			return
		}

		await this.EntradaService.deletarEntrada(id)
		alert("Entrada deletada com sucesso!")
	}

	async clonar() {
		try {
			this.dialogClonar = true
			let confirmDelete = await new Promise((resolve) => this.resolveClonar = resolve)
			this.dialogClonar = false

			if (!confirmDelete) {
				return
			}

			let localMes = localStorage.getItem("mes")
			let localAno = localStorage.getItem("ano")

			let mes = localMes ? parseInt(localMes) : new Date().getMonth() + 1
			let ano = localAno ? parseInt(localAno) : new Date().getFullYear()

			let momentdate = moment().startOf("month").set("year", ano).set("month", mes).subtract(1, "month").subtract(1, "day")

			let momentMes = momentdate.toDate().getMonth() + 1
			let momentAno = momentdate.toDate().getFullYear()

			await this.EntradaService.clonar(momentMes, momentAno)
			alert("Entradas anteriores clonadas com sucesso!")
		} catch (error) {
			console.log(error)
			alert("Ocorreu um erro ao clonar as entradas anteriores!")
		}
	}
}
