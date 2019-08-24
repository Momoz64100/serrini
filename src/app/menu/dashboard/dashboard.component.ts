import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/entities/users';
import { Radio } from 'src/app/entities/radio';
import { RadioService } from 'src/app/services/radio.service';
import { MessageGrades } from 'src/app/entities/message-grades';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: Users[];
  messages: MessageGrades[];
  currentRadios: Radio = {};

  constructor(
    private userService: UserService,
    private radioService: RadioService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as Users
      }).sort((a, b) => a.prenom < b.prenom ? -1 : a.prenom > b.prenom ? 1 : 0)
    });

    this.messageService.getMessages().subscribe(data => {
      this.messages = data.map(x => {
        var minutesAgo = new Date().getMinutes() - new Date(x.payload.doc.get('timestamp').seconds * 1000).getMinutes();    
        var dbDate = new Date(x.payload.doc.get('timestamp').seconds * 1000).toLocaleDateString();
        var dateEquals = new Date().toLocaleDateString() == dbDate;
        
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data(),
          date: dateEquals ? 'Aujourd\'hui' : dbDate,
          minutesAgo: minutesAgo > 60 ? "" : minutesAgo.toString() + " min"
        } as MessageGrades
      }).sort((a, b) => a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0)
    });

    this.radioService.getRadios().subscribe(data => {
      this.currentRadios = data[0].payload.doc.data();
      this.currentRadios.id = data[0].payload.doc.id;
    });
  }
}
