import { Component, OnInit } from '@angular/core';
import { Annuaire } from 'src/app/entities/annuaire';
import { Globals } from 'src/app/globals';
import { AnnuaireService } from 'src/app/services/annuaire.service';
import { Group } from 'src/app/entities/group';
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

    this.annuaireService.getAnnuaires().subscribe(data => {
      this.annuaires = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as Annuaire
      }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    });

    this.annuaireService.getGroups().subscribe(data => {
      this.groups = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as Group
      }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    });
  }

  createAnnuaire() {
    this.currentAnnuaire.byUser = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
    this.currentAnnuaire.tel = $('#tel').val(),
    this.annuaireService.createAnnuaire(this.currentAnnuaire);
    this.currentAnnuaire = {};
    $('#tel').val("");
  }

  createGroup() {
    this.annuaireService.createGroup(this.currentGroup);
    this.currentGroup = {};
  }
}
