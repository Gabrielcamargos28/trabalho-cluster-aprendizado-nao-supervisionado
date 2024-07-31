import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-informacoes',
  standalone: true,
  imports: [AccordionModule,DividerModule,HeaderComponent, CommonModule],
  templateUrl: './informacoes.component.html',
  styleUrl: './informacoes.component.scss'
})
export class InformacoesComponent {

}
