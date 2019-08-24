import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/entities/users';
import { UserService } from 'src/app/services/user.service';
import { RadioService } from 'src/app/services/radio.service';
import { Radio } from 'src/app/entities/radio';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private radioService: RadioService) { }

  currentUser: Users = {};
  currentRadios: Radio = {};

  ngOnInit() {
    this.radioService.getRadios().subscribe(data => {
      this.currentRadios = data[0].payload.doc.data();
      this.currentRadios.id = data[0].payload.doc.id;
    });   
  }

  onSubmit(type: string) {
    switch (type) {
      case 'addUser':
        this.userService.createUser(this.currentUser);
        this.currentUser = {};
        break;
      case 'editRadio':
        this.radioService.updateRadio(this.currentRadios);
        break;
      default:
        break;
    }
  }
}
