import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { AppUsers } from 'src/app/models/AppUsers.model';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/User.model';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers:[LoginServiceService]
})
export class LoginFormComponent implements OnInit {

  constructor(private loginServiceService: LoginServiceService) { }
  users;
  ngOnInit() {
  }

  onSubmit(user: Users) {
    console.log(user.Email, user.Password);
    var a = this.loginServiceService.sendData(user)
    console.log(a)
    
    
    
    // .subscribe(
    //   message => {
    //     debugger
    //     console.log(message);
    //   },
    //   error => {
    //     debugger
    //     console.log(error);
    //   })
  }
}