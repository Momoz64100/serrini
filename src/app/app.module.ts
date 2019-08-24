// Packages
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

// Modules
import { LoginRoutingModule } from './login/login-routing.module';
import { AppRoutingModule } from './app-routing.module';

//Env
import { environment } from '../environments/environment';

//Globals
import { AppProvider } from './app.provider';
import { Globals } from './globals';

//Services
import { AuthGuard } from './auth.guard.service';
import { UserService } from './services/user.service';
import { RadioService } from './services/radio.service';

//Directives
import { AuthorizedHtmlViewDirective } from './directives/authorized-html-view';

//Components
import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { MissionsReportsComponent } from './menu/missions-reports/missions-reports.component';
import { LoginComponent } from './login/login.component';
import { TestsComponent } from './menu/tests/tests.component';
import { AdminComponent } from './menu/admin/admin.component';

export function appProviderFactory(provider: AppProvider) {
  return (): Promise<boolean> => { 
    return provider.load();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    DashboardComponent,
    MissionsReportsComponent,
    TestsComponent,
    AdminComponent,
    AuthorizedHtmlViewDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  providers: [
    AppProvider, { provide: APP_INITIALIZER, useFactory: appProviderFactory, deps: [AppProvider], multi: true },
    Globals,
    AuthGuard,
    UserService,
    RadioService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }