import { Component, OnInit } from '@angular/core';
import { FinanceObjectif, FinanceContributor, FinanceRevenus } from 'src/app/entities/finances';
import { Globals } from 'src/app/globals';
import { FinancesService } from 'src/app/services/finances.service';
import { orderByArrayAsc, orderByArrayDesc } from 'src/app/helpers/array-utils';
import { concatUserName } from 'src/app/helpers/utils';
declare var $: any;

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
  argentDisponible: number;
  globalInvestedValues: number = 0;

  constructor(
    public globals: Globals,
    private financesService: FinancesService) { }

  ngOnInit() {
    this.financesService.getObjectifs().subscribe(data => {
      this.revenusTotal = 0;
      this.argentDisponible = 0;
      this.objectifs = data;
      orderByArrayAsc(this.objectifs, "isCompleted");
      orderByArrayDesc(this.objectifs, "isPrincipal");
      this.objectifs.forEach(x => {
        this.revenusTotal += !x.isCompleted ? x.value : 0;
        this.globalInvestedValues += x.investedValue;
      });
    });

    this.financesService.getRevenus().subscribe(data => {
      this.revenusAcquis = 0;
      this.revenus = data;
      orderByArrayDesc(this.revenus, "value");
      this.revenus.forEach(x => this.revenusAcquis += x.value);
    });

    this.financesService.getRevenusGlobal().subscribe(data => {
      this.revenusAcquisGlobal = 0;
      this.revenusGlobal = data;
      orderByArrayDesc(this.revenusGlobal, "value");
      this.revenusGlobal.forEach(x => this.revenusAcquisGlobal += x.value);
    });

    this.financesService.getRevenusByUser(this.globals.currentUser.id).subscribe(x => {
      if (x.length > 0) {
        this.currentRevenus = x[0].payload.doc.data();
        this.currentRevenus.id = x[0].payload.doc.id;
        this.update = true;
      }
      else
        this.currentRevenus = {};
    });

    this.financesService.getRevenusGlobalByUser(this.globals.currentUser.id).subscribe(x => {
      if (x.length > 0) {
        this.currentRevenusGlobal = x[0].payload.doc.data();
        this.currentRevenusGlobal.id = x[0].payload.doc.id;
        this.update = true;
      }
      else
        this.currentRevenusGlobal = {};

      this.argentDisponible = (this.revenusAcquis + this.revenusAcquisGlobal) - this.globalInvestedValues;
    });
  }

  createRevenus() {
    this.currentRevenus.userId = this.globals.currentUser.id;
    this.currentRevenus.userName = concatUserName(this.globals.currentUser.prenom, this.globals.currentUser.nom);
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
    this.financesService.createObjectif(this.currentObjectif)
    this.currentObjectif = {};
  }

  updateObjectif(id: string, isPrincipal: boolean) {
    this.financesService.updateObjectif(id, !isPrincipal);
  }

  updateObjectifOk(id: string) {
    this.financesService.updateObjectifOk(id);
  }

  updateInvestedValue(id: string, value: number) {
    this.financesService.updateInvestedValue(id, value);
    $(".modal-backdrop").remove();
  }

  getPercentage(price: number, investedValue: number) {
    return Math.floor(investedValue / price * 100);
  }

  private calcultateRevenus() {



  }
}
