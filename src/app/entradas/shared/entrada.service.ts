import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';
import Entrada from './entrada.model';

@Injectable({
	providedIn: 'root'
})
export class EntradaService {

	constructor() { }

	async listarEntradasMes(mes: number = new Date().getMonth()): Promise<Entrada[]> {
		let { data } = await axios.get(`${urlApi}/entradas/${mes}`)
		return data
	}

	async inserirEntrada(entrada: Entrada): Promise<void> {
		await axios.post(`${urlApi}/entradas/`, entrada)
	}

	async atualizarEntrada(dadosNovos: Entrada, id: number): Promise<void> {
		await axios.put(`${urlApi}/entradas/${id}`, dadosNovos)
	}

	async deletarEntrada(id: number): Promise<void> {
		await axios.delete(`${urlApi}/entradas/${id}`)
	}
}
