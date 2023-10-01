import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEntradaComponent } from './adicionar-entrada.component';

describe('AdicionarEntradaComponent', () => {
  let component: AdicionarEntradaComponent;
  let fixture: ComponentFixture<AdicionarEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
