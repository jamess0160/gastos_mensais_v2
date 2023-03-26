import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';

export type Banco = {
	id?: number,
	nome?: string,
	icone?: string,
	posicao?: number
}

export type Tile = Banco & {
	totais: {
		alimentacao: string,
		transportes: string,
		geral: string
	},
	total: string
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
		try {
			let { data } = await axios.get(`${urlApi}/bancos`)
			return data
		} catch (error) {
			console.error(error)
			return []
		}
	}

	async inserirBanco(banco: Banco): Promise<boolean> {
		try {
			await axios.post(`${urlApi}/bancos/`, banco)
			return true
		} catch (error) {
			alert("Ocorreu um erro ao adicionar o banco")
			console.error(error)
			return false
		}
	}

	async atualizarBanco(banco: Banco, id: number): Promise<boolean> {
		try {
			await axios.put(`${urlApi}/bancos/${id}`, banco)
			return true
		} catch (error) {
			alert("Ocorreu um erro ao atualizar o banco")
			console.error(error)
			return false
		}
	}

	async deletarBanco(id: number): Promise<boolean> {
		try {
			await axios.delete(`${urlApi}/bancos/${id}`)
			return true
		} catch (error) {
			alert("Ocorreu um erro ao deletar o banco")
			console.error(error)
			return false
		}
	}
}
