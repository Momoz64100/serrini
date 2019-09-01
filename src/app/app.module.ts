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
import { MessageService } from './services/message.service';

//Directives
import { AuthorizedHtmlViewDirective } from './directives/authorized-html-view';

//Components
import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { MissionsReportsComponent } from './menu/missions-reports/missions-reports.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './menu/admin/admin.component';
import { WorkingDayService } from './services/working-day.service ';
import { WorkingTypeColorPipe } from './pipes/working-type.pipe';
import { ObjectifsService } from './services/objectifs.service';
import { ObjectifsComponent } from './menu/objectifs/objectifs.component';
import { MissionsReportsService } from './services/missions-reports.service';
import { AnnuaireComponent } from './menu/annuaire/annuaire.component';
import { AnnuaireService } from './services/annuaire.service';
import { WeedComponent } from './menu/weed/weed.component';
import { WeedService } from './services/weed.service';
import { FinancesComponent } from './menu/finances/finances.component';
import { FinancesService } from './services/finances.service';

export function loadProvider(provider: AppProvider): Function 
{
  return () => { return provider.load() }; 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component,
    WorkingTypeColorPipe,
    AuthorizedHtmlViewDirective,
    DashboardComponent,
    MissionsReportsComponent,
    AdminComponent,
    ObjectifsComponent,
    MissionsReportsComponent,
    AnnuaireComponent,
    WeedComponent,
    FinancesComponent
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
    AppProvider,
    { provide: APP_INITIALIZER, useFactory:loadProvider, deps: [AppProvider], multi: true },
    Globals,
    AuthGuard,
    AngularFirestore,
    UserService,
    RadioService,
    MessageService,
    WorkingDayService,
    ObjectifsService,
    MissionsReportsService,
    AnnuaireService,
    WeedService,
    FinancesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }