import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ProdutoService } from '../service/produto.service';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.page.html',
  styleUrls: ['./produto-cadastro.page.scss'],
})
export class ProdutoCadastroPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formB: FormBuilder,
    private navCtrl: NavController,
    private template: TemplateService,
    private produtoServ: ProdutoService) {
    this.iniciarForm();
  }

  ngOnInit() {
  }

  cadastro() {
    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento

      this.produtoServ.cadastrar(this.formGroup.value).subscribe(response => {
        load.dismiss();
        this.template.myAlert(response);
      })

    })
  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      nome: [],
      preco: [],
      marca: [],
      departamento: []
    })
  }

}
