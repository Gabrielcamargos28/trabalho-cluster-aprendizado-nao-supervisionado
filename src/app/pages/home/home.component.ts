import { Component } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { HeaderComponent } from "../header/header.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


export interface Genero{
  nome: string;
  valor: number;
}
export interface Multiple{
  nome: string;
  valor: number
}
export interface Contrato{
  nome: string;
  valor: number
}
export interface Internet{
  nome: string;
  valor: number
}
export interface Forma{
  nome: string;
  valor: number
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SelectButtonModule,
    PanelModule,
    FloatLabelModule,
    TreeSelectModule,
    InputNumberModule,
    ReactiveFormsModule,
    HeaderComponent,
    CardModule,
    ButtonModule,
    ScrollerModule,
    DropdownModule,
    CommonModule
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  stateOptions: any[] = [
    { label: 'Não', value: 0 },
    { label: 'Sim', value: 1 }
  ];
  multipleLinesOptions: Multiple[] | undefined
  paymentMethods: Forma[] | undefined
  generos: Genero[] | undefined;
  contratos: Contrato[] | undefined;
  tipoInternet: Internet[] | undefined;
  clusterForm: FormGroup;
  items!: string[][];
  stremingMovies: Genero[] | undefined;
  clusterDescription: string | undefined;

    ngOnInit() {
        this.items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
    }

  constructor() {
    this.generos = [
      { nome: 'Masculino', valor: 0},
      { nome: 'Feminino', valor: 1},
    ];
    this.multipleLinesOptions = [
      {nome: 'Não', valor: 0},
      {nome: 'Sim', valor: 1},
      {nome: 'Outro', valor: 0.333},
    ];
    this.tipoInternet = [
      {nome: 'DSL', valor: 0},
      {nome: 'Fibra', valor: 0},
      {nome: 'Não tem', valor: 0.333},
    ];
    this.contratos = [
      {nome: 'Anual', valor: 1},
      {nome: '2 Anos', valor: 2},
      {nome: 'Mensal', valor: 0.5},
    ];
    this.paymentMethods = [
      {nome: 'Transferencia Bancaria', valor: 1},
      {nome: 'Check eletronico', valor: 0},
      {nome: 'Boleto', valor: 0.667},
      {nome: 'Cartão de Credito', valor: 0.333},
    ];
    this.stremingMovies = [
      {nome: 'Não', valor: 0},
      {nome: 'Sim', valor: 1},
      {nome: 'Não tem Internet', valor: 0.333},
    ]
    this.clusterForm = new FormGroup({
      genero: new FormControl(null, Validators.required),
      seniorCitizen: new FormControl(null, Validators.required),
      partner: new FormControl(null, Validators.required),
      dependents: new FormControl(null, Validators.required),
      phoneService: new FormControl(null, Validators.required),
      multipleLines: new FormControl(null, Validators.required),
      internetService: new FormControl(null, Validators.required),
      onlineSecurity: new FormControl(null, Validators.required),
      onlineBackup: new FormControl(null, Validators.required),
      deviceProtection: new FormControl(null, Validators.required),
      techSupport: new FormControl(null, Validators.required),
      streamingTV: new FormControl(null, Validators.required),
      streamingMovies: new FormControl(null, Validators.required),
      paymentMethod: new FormControl(null, Validators.required),
      contract: new FormControl(null, Validators.required),
      churn: new FormControl(null, Validators.required)
    });
  }
  predictCluster() {
    const data = this.clusterForm.value;
    console.log('Input Data:', data);
  
    // Define os centros dos clusters conforme o PMML
    const clusters = [
      { 
        name: 'cluster_0', 
        center: [0.476, 0.029, 0.483, 0.424, 1.0, 0.08, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.542, 0.292, 0.06],
        descricao: 'Cluster 2: Clientes com baixa probabilidade de churn, que mantêm contratos de dois anos e utilizam muitos serviços adicionais.'
      },
      { 
        name: 'cluster_1', 
        center: [0.49, 0.195, 0.487, 0.278, 0.886, 0.276, 0.191, 0.123, 0.146, 0.149, 0.124, 0.164, 0.17, 0.708, 0.675, 0.317],
        descricao: 'Cluster 1: Clientes com alta probabilidade de churn, que costumam cancelar após um ano de contrato e têm contratos mensais.'
      }
    ];
  
    // Função para calcular a distância Euclidiana quadrática
    const squaredEuclideanDistance = (point1: number[], point2: number[]) => {
      return point1.reduce((sum, value, index) => sum + Math.pow(value - point2[index], 2), 0);
    };
  
    // Dados de entrada diretos (ordem dos campos conforme o PMML)
    const inputData = [
      data.genero, data.seniorCitizen, data.partner, data.dependents,
      data.phoneService, data.multipleLines, data.internetService,
      data.onlineSecurity, data.onlineBackup, data.deviceProtection, data.techSupport,
      data.streamingTV, data.streamingMovies, data.contract, data.paymentMethod
    ];
  
    // Calcula a distância para cada cluster
    const distances = clusters.map(cluster => ({
      name: cluster.name,
      distance: squaredEuclideanDistance(inputData, cluster.center),
      descricao: cluster.descricao
    }));
  
    // Encontra o cluster mais próximo
    const closestCluster = distances.reduce((closest, current) => (current.distance < closest.distance) ? current : closest);
  
    this.clusterDescription = closestCluster.descricao;
  }
  
  
}
