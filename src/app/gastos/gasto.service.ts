import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';

export type Gasto = {
	id?: number
	data_gasto?: string | null
	data_registro?: string | null
	descricao?: string | null
	parcela_atual?: number | null
	parcelas_totais?: number | null
	valor?: number | null
	tipo?: number | null
	destino?: number | null
	banco_id?: number | null
	active?: 1 | 0
	fixo?: boolean
}

@Injectable({
	providedIn: 'root'
})
export class GastoService {

	constructor() { }

	async listarGastos(banco: number, tipo: number, mes: number = new Date().getMonth() + 1, ano: number = new Date().getFullYear()): Promise<Gasto[]> {
		try {
			let { data }: { data: Gasto[] } = await axios.get(`${urlApi}/registro_gastos/${banco}/${tipo}/${mes}/${ano}`)
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

	async inativarGasto(id: number, active: boolean): Promise<void> {
		try {
			await axios.put(`${urlApi}/registro_gastos/active=${active}/${id}`)
		} catch (error) {
			console.error(error)
			alert("Aconteceu um erro ao inativar")
		}
	}
}
