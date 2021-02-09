import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { TemplateService } from '../service/template.service';


@Component({
  selector: 'app-atualizar-produto',
  templateUrl: './atualizar-produto.page.html',
  styleUrls: ['./atualizar-produto.page.scss'],
})
export class AtualizarProdutoPage implements OnInit {


  formGroup: FormGroup;
  produto: Produto = new Produto();
  
  constructor(private navCtrl: NavController,
    private formB: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private produtoServ: ProdutoService,
    private template: TemplateService) {
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
      nome: [this.produto.nome],
      preco: [this.produto.preco],
      marca: [this.produto.marca],
      departamento: [this.produto.departamento]
    })
  }

  atualizar() {

    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento

      this.produtoServ.atualizar(this.produto.id, this.formGroup.value).subscribe(response => {
        load.dismiss();
        this.template.myAlert(response);
      },err=>{
        load.dismiss();
        this.template.myAlert(err);
      })

    })
  }

}
