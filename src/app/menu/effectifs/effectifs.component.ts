import { Component, OnInit } from '@angular/core';
import { Globals } from 'src/app/globals';
import { EffectifsService } from 'src/app/services/effectifs.service';
import { Effectifs } from 'src/app/entities/effectifs';
import { orderByArrayAsc } from 'src/app/helpers/array-utils';

@Component({
  selector: 'app-effectifs',
  templateUrl: './effectifs.component.html',
  styleUrls: ['./effectifs.component.scss']
})
export class EffectifsComponent implements OnInit {

  effectifs: Effectifs[];
  currentUserEffectif: Effectifs = {};

  constructor(
    public globals: Globals,
    private effectifsService: EffectifsService
  ) { }

  ngOnInit() {
    this.effectifsService.getEffectifs().subscribe(data => {
      this.effectifs = data;
      orderByArrayAsc(this.effectifs, "userName");
    });

    this.effectifsService.getEffectifsByUser(this.globals.currentUser.id).subscribe(data => {
      this.currentUserEffectif = data[0];
    });
  }

  changeStatut(effectif: Effectifs, jour: string) {
    switch (jour) {
      case 'lundi1':
        effectif.lundi1 = this.getTypeNumber(effectif.lundi1);
        break;
      case 'lundi2':
        effectif.lundi2 = this.getTypeNumber(effectif.lundi2);
        break;
      case 'lundi3':
        effectif.lundi3 = this.getTypeNumber(effectif.lundi3);
        break;
      case 'mardi1':
        effectif.mardi1 = this.getTypeNumber(effectif.mardi1);
        break;
      case 'mardi2':
        effectif.mardi2 = this.getTypeNumber(effectif.mardi2);
        break;
      case 'mardi3':
        effectif.mardi3 = this.getTypeNumber(effectif.mardi3);
        break;
      case 'mercredi1':
        effectif.mercredi1 = this.getTypeNumber(effectif.mercredi1);
        break;
      case 'mercredi2':
        effectif.mercredi2 = this.getTypeNumber(effectif.mercredi2);
        break;
      case 'mercredi3':
        effectif.mercredi3 = this.getTypeNumber(effectif.mercredi3);
        break;
      case 'jeudi1':
        effectif.jeudi1 = this.getTypeNumber(effectif.jeudi1);
        break;
      case 'jeudi2':
        effectif.jeudi2 = this.getTypeNumber(effectif.jeudi2);
        break;
      case 'jeudi3':
        effectif.jeudi3 = this.getTypeNumber(effectif.jeudi3);
        break;
      case 'vendredi1':
        effectif.vendredi1 = this.getTypeNumber(effectif.vendredi1);
        break;
      case 'vendredi2':
        effectif.vendredi2 = this.getTypeNumber(effectif.vendredi2);
        break;
      case 'vendredi3':
        effectif.vendredi3 = this.getTypeNumber(effectif.vendredi3);
        break;
      case 'samedi1':
        effectif.samedi1 = this.getTypeNumber(effectif.samedi1);
        break;
      case 'samedi2':
        effectif.samedi2 = this.getTypeNumber(effectif.samedi2);
        break;
      case 'samedi3':
        effectif.samedi3 = this.getTypeNumber(effectif.samedi3);
        break;
      case 'dimanche1':
        effectif.dimanche1 = this.getTypeNumber(effectif.dimanche1);
        break;
      case 'dimanche2':
        effectif.dimanche2 = this.getTypeNumber(effectif.dimanche2);
        break;
      case 'dimanche3':
        effectif.dimanche3 = this.getTypeNumber(effectif.dimanche3);
        break;
      default:
        break;
    }

    this.effectifsService.updateEffectif(effectif);
  }

  resetAllEffectif() {
    this.effectifsService.resetAllEffectifs();
  }

  private getTypeNumber(value: number) {
    return value >= 3 ? 1 : value += 1;
  }
}
