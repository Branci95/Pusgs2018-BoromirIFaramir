import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationServiceService } from 'src/app/services/registration-service.service';
import { Users } from '../models/User.model'
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  isValid : Boolean;

  constructor(private registrationServiceService : RegistrationServiceService) { };

  ngOnInit() {
  }

  onSubmit(user: Users) {
    console.log(user);
    this.registrationServiceService.postUserMethod(user)
    .subscribe(
      data=> {
        alert("You have been successfully registred!");
      },
      error => {
        alert("User already exists!");
      })
  }

}
