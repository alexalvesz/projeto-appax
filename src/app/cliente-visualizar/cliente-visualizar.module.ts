import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteVisualizarPageRoutingModule } from './cliente-visualizar-routing.module';

import { ClienteVisualizarPage } from './cliente-visualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteVisualizarPageRoutingModule
  ],
  declarations: [ClienteVisualizarPage]
})
export class ClienteVisualizarPageModule {}