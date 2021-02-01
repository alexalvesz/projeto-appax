import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup : FormGroup; 

  constructor(private formB : FormBuilder,
    private navCtrl : NavController,
    private menuCtrl : MenuController,
    private auth : AngularFireAuth) {
    
    this.menuCtrl.enable(false);
    this.iniciarForm();
  }

  ngOnInit() {
  }

  logar(){

    let user = this.formGroup.controls['username'].value;
    let password = this.formGroup.controls['password'].value;

    this.auth.signInWithEmailAndPassword(user,password).then(data=>{
      this.navCtrl.navigateRoot(['/home']);
    }).catch(err=>{
      console.log("Login incorreto");
    })


    
  }

  iniciarForm(){
    this.formGroup = this.formB.group({
      username : ['', [Validators.required,Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  paginaCadastro(){
    this.navCtrl.navigateForward(['/login-cadastro']);
  }

}