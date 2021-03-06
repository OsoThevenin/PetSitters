import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: '../views/chats/chats.module#ChatsPageModule'
          },
          {
            path: 'perfil-cuidador/:username',
            children: [
              {
                path: '',
                loadChildren: '../views/search/perfil-cuidador/perfil-cuidador.module#PerfilCuidadorPageModule'
              }
            ]
          }
          /*
          {
            path: 'chat',
            children: [
              {
                path: '',
                loadChildren: '../views/chat/chat.module#ChatPageModule'
              }
            ]
          }
          */
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: '../views/search/search.module#SearchPageModule'
          },
          {
            path: 'perfil-cuidador/:username',
            children: [
              {
                path: '',
                loadChildren: '../views/search/perfil-cuidador/perfil-cuidador.module#PerfilCuidadorPageModule'
              }
            ]
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: '../views/notification/notification.module#NotificationPageModule'
          }
        ]
      },
      {
        path: 'ranking',
        children: [
          {
            path: '',
            loadChildren: '../views/ranking/ranking.module#RankingPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../views/profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/search',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
