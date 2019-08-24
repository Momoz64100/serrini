import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/entities/users';
import { Radio } from 'src/app/entities/radio';
import { RadioService } from 'src/app/services/radio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: Users[];
  currentRadios: Radio = {};

  constructor(private userService: UserService, private radioService: RadioService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as Users
      }).sort((a, b) => a.prenom < b.prenom ? -1 : a.prenom > b.prenom ? 1 : 0)
    });

    this.radioService.getRadios().subscribe(data => {
      this.currentRadios = data[0].payload.doc.data();
      this.currentRadios.id = data[0].payload.doc.id;
    });   
  }
}
