import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/entities/users';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  users: Users[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(x => {
        return {
          id: x.payload.doc.id,
          ...x.payload.doc.data()
        } as Users
      })
    });
  }

  test() {

  }

  create() {
    var usertest: Users = {
      login: "test2",
      password: "test2",
      roles: "TEST1;TEST2;TEST4",
      tel: "885-541",
      prenom: "le prenom",
      nom: "le nom",
      surnom: "le surnom"
    };

    this.userService.createUser(usertest);
  }

  update() {
    var usertest = {
      id: "BCUf5dpjGXnaEjXjC9jJ",
      prenom: "test update"
    }
    this.userService.updateUser(usertest);
  }

  delete(id: string) {
    this.userService.deleteUser("BCUf5dpjGXnaEjXjC9jJ");
  }
}
