import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { TemplateService } from '../services/template.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formB: FormBuilder,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private auth: AngularFireAuth,
    private template: TemplateService) {

    this.menuCtrl.enable(false);
    this.iniciarForm();
  }

  ngOnInit() {
  }

  logar() {

    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carregamento

      let user = this.formGroup.controls['username'].value;
      let password = this.formGroup.controls['password'].value;

      this.auth.signInWithEmailAndPassword(user, password).then(data => {
      // Login correto
        load.dismiss(); // Parar o carregamento
        this.navCtrl.navigateRoot(['/home']);
      }).catch(err => {
        // Login errado
        load.dismiss();
        this.template.myAlert("Login Incorreto");

      })

    })

  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      username: ['alex@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    })
  }

  paginaCadastro() {
    this.navCtrl.navigateForward(['/login-cadastro']);
  }

}
