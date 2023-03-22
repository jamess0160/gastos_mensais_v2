import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-adicionar',
	templateUrl: './adicionar.component.html',
	styleUrls: ['./adicionar.component.scss']
})
export class AdicionarComponent {
	@Input() dialogOpen: boolean = false
	@Output() dialogOpenChange = new EventEmitter<boolean>()

	fecharDialog() {
		this.dialogOpen = false
		this.dialogOpenChange.emit(this.dialogOpen)
	}
}
