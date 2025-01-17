import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesComponent } from './informacoes.component';

describe('InformacoesComponent', () => {
  let component: InformacoesComponent;
  let fixture: ComponentFixture<InformacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
