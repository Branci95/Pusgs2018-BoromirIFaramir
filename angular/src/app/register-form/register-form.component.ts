import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from '../models/User.model'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  isValid : Boolean;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(user: Users) {
    console.log(user);
  }

}
