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
  { path: 'trophies', loadChildren: './views/trophies/trophies.module#TrophiesPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

