import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupServiceService } from 'src/app/services/signup-service.service'
import { Users } from '../models/User.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  isValid : Boolean;

  constructor(private signupServiceService : SignupServiceService, private router: Router) { };

  ngOnInit() {
  }

  onSubmit(user: Users) {
    console.log(user);
    this.signupServiceService.regUser(user)
    .subscribe(
      data=> {
        alert("You have been successfully registred!");
        this.router.navigate(['/login']);
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

}
