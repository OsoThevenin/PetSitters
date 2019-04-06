import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilCuidadorPage } from './perfil-cuidador.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilCuidadorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilCuidadorPage]
})
export class PerfilCuidadorPageModule {}
