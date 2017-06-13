import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { UserService } from './users/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	passInput: String;
	loginInput: String;
	user: Object = null;

	constructor(private userService: UserService) {
		this.user = userService.getUser()
	}

	login() {
		console.log(this.loginInput, this.passInput);

		if(this.userService.login(this.loginInput, this.passInput)) {
			this.user = this.userService.getUser();
			console.log("Logged as: ", this.user)
		} else {
			this.user = null;
		}

		console.log(this.user);
	}

	logout() {
		if(this.userService.logout()) {
			this.user = this.userService.getUser();
		} else {
			this.user = this.userService.getUser();
		}
	}

	userLoged():Boolean {
		return (this.user == null) ? false : true;
	}
}
