import { Component, OnInit } from '@angular/core';
import { FinanceObjectif, FinanceContributor, FinanceRevenus } from 'src/app/entities/finances';
import { Globals } from 'src/app/globals';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})
export class FinancesComponent implements OnInit {
  objectifs: FinanceObjectif[];
  revenus: FinanceRevenus[];
  revenusGlobal: FinanceRevenus[];
  contributors: FinanceContributor[];
  currentObjectif: FinanceObjectif = {};
  currentRevenus: FinanceRevenus = {};
  currentRevenusGlobal: FinanceRevenus = {};
  currentContributor: FinanceContributor = {};
  update: boolean = false;
  revenusAcquis: number;
  revenusAcquisGlobal: number;
  revenusTotal: number;
  revenusGlobalTotal: number;

  constructor(
    public globals: Globals,
    private financesService: FinancesService) { }

  ngOnInit() {
    this.financesService.getObjectifs().subscribe(data => {
      this.objectifs = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as FinanceObjectif
      }).sort((a, b) => a.isPrincipal > b.isPrincipal ? -1 : a.isPrincipal < b.isPrincipal ? 1 : 0)

      this.revenusTotal = 0;
      this.objectifs.forEach(x => this.revenusTotal += !x.isCompleted ? x.value : 0);
    });

    this.financesService.getRevenus().subscribe(data => {
      this.revenus = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as FinanceRevenus
      }).sort((a, b) => a.value < b.value ? -1 : a.value > b.value ? 1 : 0)

      this.revenusAcquis = 0;
      this.revenus.forEach(x => this.revenusAcquis += x.value);
    });

    this.financesService.getRevenusGlobal().subscribe(data => {
      this.revenusGlobal = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as FinanceRevenus
      }).sort((a, b) => a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)

      this.revenusAcquisGlobal = 0;
      this.revenusGlobal.forEach(x => this.revenusAcquisGlobal += x.value);
    });

    this.financesService.getRevenusByUser(this.globals.currentUser.id).subscribe(x => {
      if (x.length > 0) {
        this.currentRevenus = x[0].payload.doc.data();
        this.currentRevenus.id = x[0].payload.doc.id;
        this.update = true;
      }
      else {
        this.currentRevenus = {};
      }
    });

    this.financesService.getRevenusGlobalByUser(this.globals.currentUser.id).subscribe(x => {
      if (x.length > 0) {
        this.currentRevenusGlobal = x[0].payload.doc.data();
        this.currentRevenusGlobal.id = x[0].payload.doc.id;
        this.update = true;
      }
      else {
        this.currentRevenusGlobal = {};
      }
    });
  }

  createRevenus() {
    this.currentRevenus.userId = this.globals.currentUser.id;
    this.currentRevenus.userName = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
    if (!this.update && this.currentRevenus.value !== 0)
      this.financesService.createRevenus(this.currentRevenus);
    else
      this.financesService.updateRevenus(this.currentRevenus);

    this.currentRevenus = {};
  }

  createRevenusGlobal() {
    this.currentRevenusGlobal.userId = this.globals.currentUser.id;
    this.currentRevenusGlobal.userName = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
    if (!this.update && this.currentRevenusGlobal.value !== 0)
      this.financesService.createRevenusGlobal(this.currentRevenusGlobal);
    else
      this.financesService.updateRevenusGlobal(this.currentRevenusGlobal);

    this.currentRevenusGlobal = {};
  }

  createObjectif() {
    this.financesService.createObjectif(this.currentObjectif);
    this.currentObjectif = {};
  }

  updateObjectif(id: string) {
    this.financesService.updateObjectif(id);
  }

  updateObjectifOk(id: string) {
    this.financesService.updateObjectifOk(id);
  }  

  getPercentage(value: number) {
    return Math.floor((this.revenusAcquis + this.revenusAcquisGlobal) / value  * 100);
  }
}
