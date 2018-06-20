import { Component, OnInit } from '@angular/core';
import { Services } from '../models/Services.model'
import { Branch } from '../models/Branch.model'
import { Vehicle } from '../models/Vehicle.model'
import { HomeRegularService } from 'src/app/services/home-regular.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-home-regular',
  templateUrl: './home-regular.component.html',
  styleUrls: ['./home-regular.component.css'],
  providers: [HomeRegularService]
})
export class HomeRegularComponent implements OnInit {

  services: Services[];
  braches: Branch[];
  vehicles: Vehicle[];

  constructor(private homeRegularService: HomeRegularService) { }

  ngOnInit() {
    this.callGetServices();
    this.callGetBranch();
    this.callGetVehicle();
  }

  callGetServices(){
    /*this.homeRegularService.getAllServices()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )*/
  }

  callGetBranch(){
    /*this.homeRegularService.getAllBranches()
    .subscribe(
      data => {
        this.braches = data;
      },
      error => {
        console.log(error);
      }
    )*/
  }

  callGetVehicle(){
    /*this.homeRegularService.getAllVehicles()
    .subscribe(
      data => {
        this.vehicles = data;
      },
      error => {
        console.log(error);
      }
    )*/
  }

  deleteService(del) {
    console.log(del);
    this.homeRegularService.deleteService(del)
    .subscribe(
      data=> {
        alert("You have been successfully delete service!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

  deleteBranch(del) {
    console.log(del);
    this.homeRegularService.deleteBranch(del)
    .subscribe(
      data=> {
        alert("You have been successfully delete branch!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

  deleteVehicle(del) {
    console.log(del);
    this.homeRegularService.deleteVehicle(del)
    .subscribe(
      data=> {
        alert("You have been successfully delete vehicle!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

}
