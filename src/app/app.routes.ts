import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InformacoesComponent } from './pages/informacoes/informacoes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'informacoes', component: InformacoesComponent },
  ];