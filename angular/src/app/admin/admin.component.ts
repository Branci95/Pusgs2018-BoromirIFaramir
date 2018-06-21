import { Component, OnInit } from '@angular/core';
import { HomeRegularService } from 'src/app/services/home-regular.service';
import { Services } from 'src/app/models/Services.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  services:Services[];

  constructor(private homeRegularService:HomeRegularService) { }

  ngOnInit() {
    this.getServicesUn();
  }

  getServicesUn(){
    this.homeRegularService.getAllServicesUna()
    .subscribe(
      data => {
        this.services = data;
        debugger
      },
      error => {
        alert(error);
      }
    )
  }

}
