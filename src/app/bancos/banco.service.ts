import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';
import Banco, { Tile } from './banco.model';

@Injectable({
	providedIn: 'root'
})
export class BancoService {

	async listarGastoPorBancos(): Promise<Tile[]> {
		let { data } = await axios.get(`${urlApi}/bancos/gastosPorBanco`)
		return data
	}

	async listarBancos(): Promise<Banco[]> {
		let { data } = await axios.get(`${urlApi}/bancos`)
		return data
	}

	async inserirBanco(banco: Banco): Promise<void> {
		await axios.post(`${urlApi}/bancos/`, banco)
	}

	async atualizarBanco(banco: Banco, id: number): Promise<void> {
		await axios.put(`${urlApi}/bancos/${id}`, banco)
	}

	async deletarBanco(id: number): Promise<void> {
		await axios.delete(`${urlApi}/bancos/${id}`)
	}
}
