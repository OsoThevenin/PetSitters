import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopoverPageModule } from './views/profile/popover/popover.module';

import { GlobalService } from './shared/global.service';
import { AuthProviderService } from './providers/auth/auth-provider.service';
import { SearchService } from 'src/app/providers/Search/search.service';
import { ModalPageModule } from './views/profile/modal/modal.module';
import { ModalSolicitudPageModule } from './views/chat/modal-solicitud/modal-solicitud.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PopoverPageModule,
    ModalPageModule,
    ModalSolicitudPageModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalService,
    AuthProviderService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
