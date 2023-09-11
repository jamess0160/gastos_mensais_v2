import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaisComponent } from './pessoais.component';

describe('PessoaisComponent', () => {
  let component: PessoaisComponent;
  let fixture: ComponentFixture<PessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
