import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';
import Gasto from './gasto.model';

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
			return []
		}
	}

	async inserirGasto(gasto: Gasto): Promise<void> {
		try {
			await axios.post(`${urlApi}/registro_gastos/`, gasto)
		} catch (error) {
			alert("Aconteceu um erro ao inserir")
		}
	}

	async atualizarGasto(dadosNovos: Gasto, id: number): Promise<void> {
		try {
			await axios.put(`${urlApi}/registro_gastos/${id}`, dadosNovos)
		} catch (error) {
			alert("Aconteceu um erro ao atualizar")
		}
	}

	async deletarGasto(id: number): Promise<void> {
		try {
			await axios.delete(`${urlApi}/registro_gastos/${id}`)
		} catch (error) {
			alert("Aconteceu um erro ao deletar")
		}
	}
}
