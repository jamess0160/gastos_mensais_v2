import { Component } from '@angular/core';
import axios from 'axios';
import { urlApi } from '../constants';

@Component({
	selector: 'app-configuracoes',
	templateUrl: './configuracoes.component.html',
	styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {
	mes: string = localStorage.getItem("mes") || (new Date().getMonth() + 1).toString()
	ano: string = localStorage.getItem("ano") || new Date().getFullYear().toString()

	async novoMes() {
		if (!confirm("Deseja mesmo iniciar um novo mês?")) {
			return
		}

		let mes = new Date().getMonth()
		let ano = new Date().getFullYear()

		try {
			await axios.post(urlApi + `/proximoMes/mesAtual=${mes}/anoAtual=${ano}`)
			alert("Novo mês começado com sucesso!")
		} catch (error: any) {

			if (error.response?.data?.msg == "Este mês já foi duplicado!") {
				alert("Este mês já foi duplicado!")
				return
			}

			console.error(error)
			alert("Ocorreu um erro ao começar um novo mês")
		}
	}

	salvarData() {
		localStorage.setItem("mes", this.mes || "")
		localStorage.setItem("ano", this.ano || "")

		alert("Data atualizada com sucesso!")
	}
}
