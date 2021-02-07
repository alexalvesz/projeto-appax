import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

// caso não tenha autorização/não fez login, redirecione para página de login
const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'sair',
    loadChildren: () => import('./sair/sair.module').then( m => m.SairPageModule),
    canActivate : [AngularFireAuthGuard],
    data : {authGuardPipe : redirectToLogin}
  },
  {
    path: 'login-cadastro',
    loadChildren: () => import('./login-cadastro/login-cadastro.module').then( m => m.LoginCadastroPageModule)
  },
  {
    path: 'cliente-lista',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'cliente-novo',
    loadChildren: () => import('./cliente-novo/cliente-novo.module').then( m => m.ClienteNovoPageModule)
  },
  {
    path: 'cliente-visualizar/id',
    loadChildren: () => import('./cliente-visualizar/cliente-visualizar.module').then( m => m.ClienteVisualizarPageModule)
  },
  {
    path: 'cliente-atualizar/:id',
    loadChildren: () => import('./cliente-atualizar/cliente-atualizar.module').then( m => m.ClienteAtualizarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
