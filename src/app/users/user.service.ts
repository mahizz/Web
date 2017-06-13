import { Injectable } from '@angular/core';

interface User {
	id: Number
	name: String
	admin: Boolean
}

@Injectable()
export class UserService {
	
	private user: User = null;

	constructor() {
		this.load();
	}

	private save() {
		localStorage.setItem('currentUser', JSON.stringify(this.user));
	}

	private load() {
		this.user = JSON.parse(localStorage.getItem('currentUser')) || null;
	}

	public login(login: String, pass: String): Boolean {

		if(login == "admin" && pass == "admin") {
			this.user = {
				id: 0,
				name: "admin",
				admin: true
			};
			this.save();
			return true;
		} else if(login == "user" && pass == "user") {
			this.user = {
				id: 1,
				name: "user",
				admin: false
			};
			this.save();
			return true;
		} else {
			return false;
		}

	}

	public logout() {
		this.user = null;
		this.save();
		return true;
	}

	public getUser(): User {
		return this.user;
	}

	public checkAccess(): Boolean {
		if(this.user == null)
			return false;
		return this.user.admin || false;
	}
}