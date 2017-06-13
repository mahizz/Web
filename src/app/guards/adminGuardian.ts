import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../users/user.service';

@Injectable()
export class AdminGuardian implements CanActivate {

  constructor(private userService: UserService,
  				private router: Router) {}

  canActivate() {
    if(this.userService.checkAccess()) {
    	return true;
    } else {
    	this.router.navigate(['Artists']);
    	return false;
    }
  }
}