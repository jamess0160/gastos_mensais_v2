import { Injectable } from '@angular/core';
import axios from 'axios';
import { urlApi } from 'src/app/constants';

export type Entrada = {
	id: number,
	nome: string,
	valor: number,
}

@Injectable({
	providedIn: 'root'
})
export class EntradaService {

	async listarEntradas(mes: number = new Date().getMonth() + 1, ano: number = new Date().getFullYear()): Promise<Entrada[]> {
		try {
			let { data } = await axios.get(urlApi + `/entradas/recentes/mes=${mes}/ano=${ano}`)
			return data
		} catch (error) {
			alert("Ocorreu um erro ao buscar as entradas")
			return []
		}
	}

	async inserirEntrada(entrada: Entrada): Promise<boolean> {
		try {
			await axios.post(`${urlApi}/entradas/`, entrada)
			return true
		} catch (error) {
			alert("Ocorreu um erro ao inserir a Entrada")
			return false
		}
	}

	async atualizarEntrada(dadosNovos: Entrada, id: number): Promise<boolean> {
		try {
			await axios.put(`${urlApi}/entradas/${id}`, dadosNovos)
			return true
		} catch (error) {
			alert("Ocorreu um erro ao atualizar a Entrada")
			return false
		}
	}

	async deletarEntrada(id: number): Promise<boolean> {
		try {
			await axios.delete(`${urlApi}/entradas/${id}`)
			return true
		} catch (error) {
			alert("Ocorreu um erro ao Deletar a Entrada")
			return false
		}
	}
}
