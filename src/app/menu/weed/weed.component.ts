import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Weed, WeedStock } from 'src/app/entities/weed';
import { WeedService } from 'src/app/services/weed.service';
import { Globals } from 'src/app/globals';
import { activeDatePicker } from 'src/app/helpers/utils';
import { parseDate } from 'src/app/helpers/dates-utils';
declare var $: any;

@Component({
  selector: 'app-weed',
  templateUrl: './weed.component.html',
  styleUrls: ['./weed.component.scss']
})
export class WeedComponent implements OnInit {
  weeds: Weed[];
  weedsStock: WeedStock[];
  currentWeed: Weed = {};
  currentWeedStock: WeedStock = {};
  update: boolean = false;
  revenuGlobalDealder: number;
  revenuPotentielGraine: number;
  revenuJour: number;

  constructor(
    public globals: Globals,
    private weedService: WeedService
  ) { }

  ngOnInit() {
    activeDatePicker('#date-weed .input-group.date');

    this.weedService.getWeed().subscribe(data => {
      this.weeds = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data(),
          date: new Date(x.payload.doc.get('date').seconds * 1000)
        } as Weed
      }).sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0)

      this.revenuGlobalDealder = 0;
      this.revenuJour = 0;
      this.weeds.forEach(x => this.revenuJour += new Date().getMonth() == x.date.getMonth() ? (x.quantity * 600) : 0);
      this.weeds.forEach(x => this.revenuGlobalDealder += (x.quantity * 600));
    });

    this.weedService.getStockWeed().subscribe(data => {
      this.weedsStock = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as WeedStock
      }).sort((a, b) => a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0)

      this.revenuPotentielGraine = 0;
      this.weedsStock.forEach(x => this.revenuPotentielGraine += (x.quantity * 10) * 600);
    });

    this.weedService.getStockWeedByUser(this.globals.currentUser.id).subscribe(x => {
      if (x.length > 0) {
        this.currentWeedStock = x[0].payload.doc.data();
        this.currentWeedStock.id = x[0].payload.doc.id;
        this.update = true;
      }
      else {
        this.currentWeedStock = {};
        this.update = false;
      }
    });
  }

  createWeed() {
    this.currentWeed.date = parseDate($('#date').val());
    this.weedService.createWeed(this.currentWeed);
    this.currentWeed = {};
  }

  createWeedStock() {
    this.currentWeedStock.userId = this.globals.currentUser.id;
    this.currentWeedStock.userName = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
    if (!this.update && this.currentWeedStock.quantity !== 0)
      this.weedService.createStockWeed(this.currentWeedStock);
    else
      this.weedService.updateStockWeed(this.currentWeedStock);
    this.currentWeedStock = {};
  }
}
