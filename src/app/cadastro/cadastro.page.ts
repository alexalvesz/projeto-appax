import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  formGroup : FormGroup; 

  constructor(private formA : FormBuilder,
    private navCtrl : NavController,
    private menuCtrl : MenuController) {
    
    this.menuCtrl.enable(false);
    this.iniciarForm();
  }

  ngOnInit() {
  }


cadastro(){
  alert("Cadastro realizado! Seja Bem Vindo!");
  console.log("");
  console.log(this.formGroup.value);
  this.navCtrl.navigateRoot(['/home']);
}

iniciarForm(){
  this.formGroup = this.formA.group({
     username: ['', [Validators.required,Validators.minLength(15)]],
    email: ['', [Validators.required,Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]]   
  })
}

}
