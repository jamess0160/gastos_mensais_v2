import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';
import Gasto from './gasto.model';

@Injectable({
	providedIn: 'root'
})
export class GastoService {

	constructor() { }

	async listarGastosMes(mes: number = new Date().getMonth()): Promise<Gasto[]> {
		let { data } = await axios.get(`${urlApi}/registro_gastos/${mes}`)
		return data
	}

	async inserirGasto(gasto: Gasto): Promise<void> {
		await axios.post(`${urlApi}/registro_gastos/`, gasto)
	}

	async atualizarGasto(dadosNovos: Gasto, id: number): Promise<void> {
		await axios.put(`${urlApi}/registro_gastos/${id}`, dadosNovos)
	}

	async deletarGasto(id: number): Promise<void> {
		await axios.delete(`${urlApi}/registro_gastos/${id}`)
	}
}
