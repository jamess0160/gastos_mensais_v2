import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';

export type Banco = {
	id?: number,
	nome?: string,
	cor?: string,
}

export type Tile = Banco & {
	totais: {
		alimentacao: string,
		transportes: string,
		geral: string
	},
	total: number
}

@Injectable({
	providedIn: 'root'
})
export class BancoService {

	async listarGastoPorBancos(): Promise<Tile[]> {
		let { data } = await axios.get(`${urlApi}/bancos/gastosPorBanco`)
		return data
	}

	async pegarBancoPorId(id: number): Promise<Banco> {
		try {
			let { data } = await axios.get(`${urlApi}/bancos/porId/${id}`)
			return data
		} catch (error) {
			alert("Ocorreu um erro ao buscar o banco por ID")
			console.error(error)
			return {}
		}
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
