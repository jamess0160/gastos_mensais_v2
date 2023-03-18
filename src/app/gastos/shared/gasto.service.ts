import { Injectable } from '@angular/core';
import axios from 'axios';
import Gasto from './gasto.model';

@Injectable({
	providedIn: 'root'
})
export class GastoService {

	urlApi: string = "http://localhost:3001"

	constructor() { }

	async listarGastosMes(mes: number = new Date().getMonth()): Promise<Gasto[]> {
		let { data } = await axios.get(`${this.urlApi}/registro_gastos/${mes}`)
		return data
	}

	async inserirGasto(gasto: Gasto): Promise<void> {
		await axios.post(`${this.urlApi}/registro_gastos/`, gasto)
	}

	async atualizarGasto(dadosNovos: Gasto, id: number): Promise<void> {
		await axios.put(`${this.urlApi}/registro_gastos/${id}`, dadosNovos)
	}

	async deletarGasto(id: number): Promise<void> {
		await axios.delete(`${this.urlApi}/registro_gastos/${id}`)
	}
}
