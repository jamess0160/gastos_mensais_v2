import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';

export type Gasto = {
	id?: number,
	data_gasto?: string,
	data_registro?: string,
	descricao?: string,
	parcela_atual?: number,
	parcelas_totais?: number,
	valor?: number,
	tipo?: number,
	banco_id?: number
}

@Injectable({
	providedIn: 'root'
})
export class GastoService {

	constructor() { }

	async listarGastos(banco: number, tipo: number, mes: number = new Date().getMonth() + 1): Promise<Gasto[]> {
		try {
			let { data }: { data: Gasto[] } = await axios.get(`${urlApi}/registro_gastos/${banco}/${tipo}/${mes}`)
			data.forEach((item) => {
				item.data_gasto = item.data_gasto ? new Date(item.data_gasto).toLocaleDateString('pt-br') : ""
				if (item.descricao) {
					let letras = item.descricao.split("")
					letras[0] = letras[0].toUpperCase()
					item.descricao = letras.join("")
				}
			})
			return data
		} catch (error) {
			console.error(error)
			return []
		}
	}

	async inserirGasto(gasto: Gasto): Promise<boolean> {
		try {
			await axios.post(`${urlApi}/registro_gastos/`, gasto)
			return true
		} catch (error) {
			console.error(error)
			alert("Aconteceu um erro ao inserir")
			return false
		}
	}

	async atualizarGasto(id: number, dadosNovos: Gasto): Promise<boolean> {
		try {
			await axios.put(`${urlApi}/registro_gastos/${id}`, dadosNovos)
			return true
		} catch (error) {
			console.error(error)
			alert("Aconteceu um erro ao atualizar")
			return false
		}
	}

	async deletarGasto(id: number): Promise<boolean> {
		try {
			await axios.delete(`${urlApi}/registro_gastos/${id}`)
			return true
		} catch (error) {
			console.error(error)
			alert("Aconteceu um erro ao deletar")
			return false
		}
	}
}
