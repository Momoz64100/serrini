import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked, DoCheck } from '@angular/core';
import { Annuaire } from 'src/app/entities/annuaire';
import { Globals } from 'src/app/globals';
import { AnnuaireService } from 'src/app/services/annuaire.service';
import { Group } from 'src/app/entities/group';
import { orderByArrayAsc } from 'src/app/helpers/array-utils';
import { forkJoin } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.scss']
})
export class AnnuaireComponent implements OnInit {
  annuaires: Annuaire[];
  groups: Group[];
  currentAnnuaire: Annuaire = {};
  currentGroup: Group = {};

  constructor(
    private globals: Globals,
    private annuaireService: AnnuaireService,
  ) { }

  ngOnInit() {
    $(document).ready(function () {
      $('.footable').footable();
    });
    
    this.getAnnuaires();
    this.getGroups();
  }

  getAnnuaires() {
    this.annuaireService.getAnnuaires().subscribe(data => {
      this.annuaires = data;
      orderByArrayAsc(this.annuaires, "name");
    });
  }

  getGroups() {
    this.annuaireService.getGroups().subscribe(data => {
      this.groups = data;
      orderByArrayAsc(this.groups, "name");
      this.fillStars();
    });
  }

  createAnnuaire() {
    this.currentAnnuaire.byUser = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
    this.currentAnnuaire.userId = this.globals.currentUser.id;
    this.currentAnnuaire.tel = $('#tel').val();
    this.annuaireService.createAnnuaire(this.currentAnnuaire).finally(() => this.fillStars());
    this.currentAnnuaire = {};
    $('#tel').val("");
  }

  createGroup() {
    this.annuaireService.createGroup(this.currentGroup);
    this.currentGroup = {};
  }

  deleteAnnuaire(id: string) {
    this.annuaireService.deleteAnnuaire(id);
  }

  setStarValue(count: number) {
    $('.fiability span').removeClass('active');
    this.currentAnnuaire.fiability = count;

    $('.fiability span').each(function (index: number) {
      index++;
      if (index <= count)
        $(this).addClass("active");
    });
  }

  fillStars() {
    this.annuaires.forEach(x => {
      $('#' + x.id + ' span').each(function (index: number) {
        index++;
        if (index <= x.fiability)
          $(this).addClass("active");
      });
    })
  }
}
