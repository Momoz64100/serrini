import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard.service';

import { Page404Component } from './page404/page404.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { MissionsReportsComponent } from './menu/missions-reports/missions-reports.component';
import { AdminComponent } from './menu/admin/admin.component';
import { ObjectifsComponent } from './menu/objectifs/objectifs.component';
import { AnnuaireComponent } from './menu/annuaire/annuaire.component';
import { WeedComponent } from './menu/weed/weed.component';
import { FinancesComponent } from './menu/finances/finances.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'rapports-missions', component: MissionsReportsComponent },
      { path: 'finances', component: FinancesComponent },
      { path: 'registre', component: AnnuaireComponent },
      { path: 'weed', component: WeedComponent },
      { path: 'objectifs', component: ObjectifsComponent },
      { path: 'admin', component: AdminComponent },
      { path: '**', component: Page404Component }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash : false }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
