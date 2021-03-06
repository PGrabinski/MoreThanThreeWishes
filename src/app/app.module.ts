import { UiService } from './shared/ui.service';
import { AuthGuard } from './auth/auth.guard';
import { WishService } from './wish/wish.service';
import { WishModule } from './wish/wish.module';
import { AuthService } from './auth/auth.service';
import { WelcomeComponent } from './navigation/welcome/welcome.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MaterialsModule } from './materials/materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HowToComponent } from './navigation/how-to/how-to.component';
import { AboutComponent } from './navigation/about/about.component';
import { FooterComponent } from './navigation/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    WelcomeComponent,
    HowToComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AuthModule,
    WishModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [AuthService, WishService, AuthGuard, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
