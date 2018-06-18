import { Component, OnInit } from '@angular/core';
import {Services} from '../models/Services.model'
import { AddServiceService } from 'src/app/services/add-service.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-home-regular',
  templateUrl: './home-regular.component.html',
  styleUrls: ['./home-regular.component.css'],
  providers: [AddServiceService]
})
export class HomeRegularComponent implements OnInit {

  

  services: Services[];

  constructor(private addServicesService: AddServiceService) { }

  ngOnInit() {
    this.callGet();
  }

  callGet(){
    this.addServicesService.getAllServices()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteService(del) {
    console.log(del);
    this.addServicesService.deleteService(del)
    .subscribe(
      data=> {
        alert("You have been successfully delete service!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

}
