import { Component, OnInit } from '@angular/core';
import { HomeRegularService } from 'src/app/services/home-regular.service';
import { Services } from 'src/app/models/Services.model';
import { error } from 'util';
import { AppUsers } from 'src/app/models/AppUsers.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  services:Services[];
  users:AppUsers[];

  constructor(private homeRegularService:HomeRegularService) { }

  ngOnInit() {
    this.getServicesUn();
    this.getUsersUn();
  }

  getUsersUn(){
    this.homeRegularService.getAllUsersUna()
    .subscribe(
      data => {
        this.users = data;
      },
      error => {
        alert(error);
      }
    )
  }

  getServicesUn(){
    this.homeRegularService.getAllServicesUna()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        alert(error);
      }
    )
  }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }

  activateService(name:string){
    this.homeRegularService.avaliableServer(1,name)
    .subscribe(
      data=>{
          alert("Send email to Manager");
      },
      error=>{
        alert(error);
      }
    )
  }

  deactivateService(name:string){
    this.homeRegularService.avaliableServer(0,name)
    .subscribe(
      data=>{
          alert("Send email to Manager");
      },
      error=>{
        alert(error);
      }
    )
  }

  activateUser(email:string){
    this.homeRegularService.avaliableuser(1,email)
    .subscribe(
      data=>{
          alert("Send email to user");
      },
      error=>{
        alert(error);
      }
    )
  }

  deactivateUser(email:string){
    this.homeRegularService.avaliableuser(0,email)
    .subscribe(
      data=>{
          alert("Send email to user");
      },
      error=>{
        alert(error);
      }
    )
  }
}
