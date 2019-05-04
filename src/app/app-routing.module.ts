import { TutorialGuard } from './guards/tutorial.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [TutorialGuard]
  },
  {
    path: 'tutorial',
    loadChildren: './intro/intro.module#IntroPageModule'
  },
  { path: 'registre', loadChildren: './registre/registre.module#RegistrePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'trophies', loadChildren: './views/trophies/trophies.module#TrophiesPageModule' },
  { path: 'perfil-cuidador/:username', loadChildren: './views/search/perfil-cuidador/perfil-cuidador.module#PerfilCuidadorPageModule' },
  { path: 'chat', loadChildren: './views/chat/chat.module#ChatPageModule' },
  { path: 'email-confirm/:username', loadChildren: './email-confirm/email-confirm.module#EmailConfirmPageModule' },
  { path: 'resetpassword', loadChildren: './resetpassword/resetpassword.module#ResetpasswordPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}



