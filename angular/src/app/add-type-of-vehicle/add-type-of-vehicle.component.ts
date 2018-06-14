import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddTypeOfVehicleService } from 'src/app/services/add-type-of-vehicle.service';

import { TypeOfVehicle } from '../models/TypeOfVehicle.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

@Component({
  selector: 'app-add-type-of-vehicle',
  templateUrl: './add-type-of-vehicle.component.html',
  styleUrls: ['./add-type-of-vehicle.component.css']
})
export class AddTypeOfVehicleComponent implements OnInit {

  constructor(private addTypeOfVehicleService : AddTypeOfVehicleService) { }

  ngOnInit() {
  }

  onSubmit(typeofvehicle : TypeOfVehicle) {
    console.log(typeofvehicle);
    this.addTypeOfVehicleService.postTypeOfVehicle(typeofvehicle)
    .subscribe(
      data=> {
        alert("You have been successfully add type of vehicle!");
      },
      error => {
        console.log(error);
        alert("Fail !");
      }
    )
  }
}
