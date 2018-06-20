import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddVehicleService } from 'src/app/services/add-vehicle.service';

import { Vehicle } from '../models/Vehicle.model'
import { TypeOfVehicle } from '../models/TypeOfVehicle.model'
import { Services } from '../models/Services.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  typeOfVehicle: TypeOfVehicle[];
  services : Services[];

  constructor(private addVehicleService : AddVehicleService) { }

  ngOnInit() {
    this.callGetType();
    this.callGetServices();
  }

  callGetType(){
    this.addVehicleService.getListOfVehicleTypes()
    .subscribe(
      data => {
        this.typeOfVehicle = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  callGetServices(){
    this.addVehicleService.getListOfServers()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(vehicle: Vehicle) {
    debugger
    console.log(vehicle);
    this.addVehicleService.postVehicle(vehicle)
    .subscribe(
      data=> {
        alert("You have been successfully add vehicle!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }
}
