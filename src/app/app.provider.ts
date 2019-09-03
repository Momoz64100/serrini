import { Injectable } from '@angular/core';
import { Users } from './entities/users';
import { UserService } from './services/user.service';
import { Globals } from './globals';

@Injectable()
export class AppProvider {
    constructor(
        public globals: Globals,
        private userService: UserService) { }

    load(): Promise<boolean> {
        console.log("ça passe dans le load");        
        return new Promise((resolve, reject) => {
            var users: Users[];
            this.userService.getUsers().subscribe(data => {
                users = data.map(x => {
                    return {
                        id: x.payload.doc.id,
                        ...x.payload.doc.data()
                    } as Users
                });

                users.map(x => {
                    if (x.id === localStorage.getItem('userId')) {
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('userId', x.id);
                        this.globals.isLoggedIn = true;
                        this.globals.currentUser = x;                        
                    }
                });

                resolve(true);
            });
        })
    }
}