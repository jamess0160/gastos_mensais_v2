import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBancoComponent } from './editar-banco.component';

describe('EditarBancoComponent', () => {
  let component: EditarBancoComponent;
  let fixture: ComponentFixture<EditarBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
