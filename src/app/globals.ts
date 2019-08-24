import { Injectable } from '@angular/core';
import { Users } from './entities/users';

@Injectable()
export class Globals {
	isLoggedIn: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false'); 
	currentUser: Users = {};
}