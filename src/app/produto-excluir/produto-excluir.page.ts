import { TemplateAstPath } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-produto-excluir',
  templateUrl: './produto-excluir.page.html',
  styleUrls: ['./produto-excluir.page.scss'],
})
export class ProdutoExcluirPage implements OnInit {
  


  cliente: Produto = new Produto();
  produto: any;
  

  constructor(private clienteServ: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private template: TemplateService,
    private navCtrl : NavController) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(idUrl => {
      let id = idUrl.get('id');
      this.clienteServ.buscarPorId(id).subscribe(response => {
        this.produto = response;
        console.log(this.produto)
      })
    })
  }

  excluir() {
    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento

      this.clienteServ.excluir(this.produto.id).subscribe(response => {
        load.dismiss();
        this.template.myAlert('Excluído com sucesso');
        this.navCtrl.navigateRoot('/produto-lista');
      })

    })
  }

}