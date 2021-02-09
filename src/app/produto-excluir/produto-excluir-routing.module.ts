import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutoExcluirPage } from './produto-excluir.page';

const routes: Routes = [
  {
    path: '',
    component: ProdutoExcluirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoExcluirPageRoutingModule {}
