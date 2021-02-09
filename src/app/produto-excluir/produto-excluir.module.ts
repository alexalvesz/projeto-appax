import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoExcluirPageRoutingModule } from './produto-excluir-routing.module';

import { ProdutoExcluirPage } from './produto-excluir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoExcluirPageRoutingModule
  ],
  declarations: [ProdutoExcluirPage]
})
export class ProdutoExcluirPageModule {}
