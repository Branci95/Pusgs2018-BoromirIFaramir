import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddVehicleService } from 'src/app/services/add-vehicle.service';

import { Vehicle } from '../models/Vehicle.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private addVehicleService : AddVehicleService) { }

  ngOnInit() {
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
