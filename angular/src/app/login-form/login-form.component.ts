import { Component, OnInit } from '@angular/core';
import { SignUpServiceService } from 'src/app/services/sign-up-service.service';
import { AppUsers } from 'src/app/models/AppUsers.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers:[SignUpServiceService]
})
export class LoginFormComponent implements OnInit {

  constructor(private signUpServiceService: SignUpServiceService) { }
  users;
  ngOnInit() {
  }

  register() {

    this.signUpServiceService.getMethodSignUp()
    .subscribe(
      data => {
        this.users=data;
      },
      error => {
        console.log(error);
      })

  }

  onSubmit(f: NgForm) {
    console.log(f.value.email, f.value.password);
  }

}
