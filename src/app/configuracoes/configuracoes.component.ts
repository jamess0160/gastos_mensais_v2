import { Component } from '@angular/core';

@Component({
	selector: 'app-configuracoes',
	templateUrl: './configuracoes.component.html',
	styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent {
	mes: string = localStorage.getItem("mes") || (new Date().getMonth() + 1).toString()
	ano: string = localStorage.getItem("ano") || new Date().getFullYear().toString()

	salvarData() {
		if (this.mes !== (new Date().getMonth() + 1).toString()) {
			localStorage.setItem("mes", this.mes || "")
		} else {
			localStorage.removeItem("mes")
		}

		if (this.ano !== new Date().getFullYear().toString()) {
			localStorage.setItem("ano", this.ano || "")
		} else {
			localStorage.removeItem("ano")
		}

		alert("Data atualizada com sucesso!")
	}
}
