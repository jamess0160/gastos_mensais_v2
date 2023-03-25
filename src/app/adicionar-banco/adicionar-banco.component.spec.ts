import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarBancoComponent } from './adicionar-banco.component';

describe('AdicionarBancoComponent', () => {
  let component: AdicionarBancoComponent;
  let fixture: ComponentFixture<AdicionarBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarBancoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
