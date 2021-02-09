import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto-visualizar',
  templateUrl: './produto-visualizar.page.html',
  styleUrls: ['./produto-visualizar.page.scss'],
})
export class ProdutoVisualizarPage implements OnInit {

  formGroup: FormGroup;
  
  produto: Produto = new Produto();
  
  constructor(private navCtrl: NavController,
    private formB: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private produtoServ: ProdutoService) {
    this.iniciarForm();
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(idUrl => {
      let id = idUrl.get('id');

      this.produtoServ.buscarPorId(id).subscribe(response => {
        this.produto = response;
        console.log(this.produto);
        this.iniciarForm();
      })

    })
  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      id: [this.produto.id],
      nome: [this.produto.nome],
      preco: [this.produto.preco],
      marca: [this.produto.marca],
      departamento: [this.produto.departamento]
    })
  }

  atualizar() {
    this.navCtrl.navigateForward(['/atualizar-produto', this.produto.id]);
  }

  remover() {
    this.navCtrl.navigateForward(['/produto-excluir', this.produto.id]);
  }
}
