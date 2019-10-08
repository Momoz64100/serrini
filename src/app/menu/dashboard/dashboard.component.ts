import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/entities/users';
import { Radio } from 'src/app/entities/radio';
import { RadioService } from 'src/app/services/radio.service';
import { MessageGrades } from 'src/app/entities/message-grades';
import { MessageService } from 'src/app/services/message.service';
import { WorkingDayService } from 'src/app/services/working-day.service ';
import { WorkingDay } from 'src/app/entities/working-day';
import { Globals } from 'src/app/globals';
import { orderByArrayAsc } from 'src/app/helpers/array-utils';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: Users[];
  messages: MessageGrades[];
  workingsDay: WorkingDay[];
  currentRadios: Radio = {};

  constructor(
    public globals: Globals,
    private userService: UserService,
    private radioService: RadioService,
    private messageService: MessageService,
    private workingSerice: WorkingDayService
  ) { }

  ngOnInit() {
    this.userService.getUsers2().subscribe(data => {
      this.users = data;
      orderByArrayAsc(this.users, "prenom"); 
      $(document).ready(function () {
        $('.footable').footable();
      });     
    });

    this.messageService.getMessages().subscribe(data => {
      this.messages = data.map(x => {
        var minutesAgo = Math.floor(((new Date().getTime() - new Date(x.payload.doc.get('timestamp').seconds * 1000).getTime()) / 1000 / 60) << 0);
        var hoursAgo = Math.floor(minutesAgo / 60);        
        var dbDate = new Date(x.payload.doc.get('timestamp').seconds * 1000).toLocaleDateString();
        var dateEquals = new Date().toLocaleDateString() == dbDate;

        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data(),
          date: dateEquals ? 'Aujourd\'hui' : dbDate,
          minutesAgo: !dateEquals ? "" : minutesAgo > 60 ? hoursAgo.toString() + " heures" : minutesAgo.toString() + " min",
        } as MessageGrades
      }).sort((a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)
    });

    this.radioService.getRadios().subscribe(data => {
      this.currentRadios = data[0].payload.doc.data();
      this.currentRadios.id = data[0].payload.doc.id;
    });

    this.workingSerice.getWorkings().subscribe(data => {
      this.workingsDay = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as WorkingDay
      }).sort((a, b) => a.status > b.status ? -1 : a.status < b.status ? 1 : 0)
    });
  }

  deleteAction(id: string) {
    this.workingSerice.deleteWorking(id);
  }

  changeStatusAction(id: string, value: any, message: any) {
    $(".modal-backdrop").remove();
    this.workingSerice.updateWorking(id, value, message);
  }

  deleteMessage(id: string) {
    this.messageService.deleteMessage(id);
  }

  updateUser() {
    this.globals.currentUser.tel = $('#legaltel').val();
    this.globals.currentUser.illegalTel = $('#illegalTel').val();
    this.userService.updateUser(this.globals.currentUser);
  }
}
