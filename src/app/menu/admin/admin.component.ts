import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/entities/users';
import { UserService } from 'src/app/services/user.service';
import { RadioService } from 'src/app/services/radio.service';
import { Radio } from 'src/app/entities/radio';
import { MessageGrades } from 'src/app/entities/message-grades';
import { Globals } from 'src/app/globals';
import { MessageService } from 'src/app/services/message.service';
import { WorkingDay } from 'src/app/entities/working-day';
import { WorkingDayService } from 'src/app/services/working-day.service ';
import { EffectifsService } from 'src/app/services/effectifs.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public globals: Globals,
    private userService: UserService,
    private radioService: RadioService,
    private messageService: MessageService,
    private workingService: WorkingDayService,
    private effectifsService: EffectifsService
    ) { }

  currentUser: Users = {};
  currentRadios: Radio = {};
  currentMessage: MessageGrades = {};
  currentWorking: WorkingDay = {};
  currentUserId: string;

  ngOnInit() {
    this.radioService.getRadios().subscribe(data => {
      this.currentRadios = data[0].payload.doc.data();
      this.currentRadios.id = data[0].payload.doc.id;
    });
  }

  onSubmit(type: string) {
    switch (type) {
      case 'addUser':
        this.userService.createUser(this.currentUser).then(x => {
          this.effectifsService.createEmptyEffectif(x, this.currentUser.prenom);
          this.currentUser = {};
        });
        break;
      case 'editRadio':
        this.radioService.updateRadio(this.currentRadios);
        this.messageService.createMessage({
          user: "ADMIN",
          message: "Les radios viennent d'être modifié par " + this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom + ' !'
        });
        break;
      case 'addMessageGrades':
        this.currentMessage.user = this.globals.currentUser.prenom + ' ' + this.globals.currentUser.nom;
        this.messageService.createMessage(this.currentMessage);
        this.currentMessage = {};
        break;
      case 'addWorkingDay':
        this.currentWorking.user = this.globals.currentUser.prenom;
        this.workingService.createWorking(this.currentWorking);
        this.currentWorking = {};
        break;
      default:
        break;
    }
  }
}
