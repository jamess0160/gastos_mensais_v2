import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-adicionar',
	templateUrl: './adicionar.component.html',
	styleUrls: ['./adicionar.component.scss']
})
export class AdicionarComponent {
	@Input() dialogOpen: boolean = false
}
