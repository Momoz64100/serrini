import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked, DoCheck } from '@angular/core';
import { Annuaire } from 'src/app/entities/annuaire';
import { Globals } from 'src/app/globals';
import { AnnuaireService } from 'src/app/services/annuaire.service';
import { Group } from 'src/app/entities/group';
import { orderByArrayAsc } from 'src/app/helpers/array-utils';
import Swal from 'sweetalert2';

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
  isUpdate = false;

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
      this.fillStars();
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

    this.currentAnnuaire.tel = $('#tel').val();

    if (this.isUpdate) {
      this.annuaireService.updateAnnuaire(this.currentAnnuaire).finally(() => this.fillStars());;
    }
    else {
      this.currentAnnuaire.byUser = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
      this.currentAnnuaire.userId = this.globals.currentUser.id;
      this.annuaireService.createAnnuaire(this.currentAnnuaire).finally(() => this.fillStars());
    }

    this.resetAnnuaire();
  }

  createGroup() {
    this.annuaireService.createGroup(this.currentGroup);
    this.currentGroup = {};
  }

  resetAnnuaire() {
    this.currentAnnuaire = {};
    this.currentAnnuaire.group = "";
    $('.fiability span').removeClass('active');
    $('#tel').val("");
    this.isUpdate = false;
  }

  editAnnuaire(id: string) {
    this.isUpdate = true;
    $('.fiability span').removeClass('active');
    this.annuaireService.getAnnuaireByid(id).subscribe(x => {
      this.currentAnnuaire = x.payload.data();
      this.currentAnnuaire.id = x.payload.id;
      var fiability = this.currentAnnuaire.fiability;
      $('#tel').val(this.currentAnnuaire.tel);
      $('.fiability span').each(function (index: number) {
        index++;
        if (index <= fiability)
          $(this).addClass("active");
      });
    })
  }

  deleteAnnuaire(id: string) {
    Swal.fire({
      title: "Es-tu sûr de toi ?",
      text: "Cette action est irréversible !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Oui, suppprimer !",
      cancelButtonText: "Annuler",
      reverseButtons: true,
      focusConfirm: false
    }).then((result) => {
      if (result.value) {
        this.annuaireService.deleteAnnuaire(id).finally(() => this.fillStars());
        Swal.fire({
          title: "Supprimé !",
          text: "Le numéro a été supprimé correctement",
          type: 'success',
        });
      }
    });
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
      $('#' + x.id + ' i').each(function (index: number) {
        index++;
        if (index <= x.fiability)
          $(this).addClass("active");
      });
    })
  }
}
