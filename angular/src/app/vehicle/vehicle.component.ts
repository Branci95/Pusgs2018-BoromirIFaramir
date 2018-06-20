import { Component, OnInit } from '@angular/core';
import { HomeRegularService } from '../services/home-regular.service';
import { Vehicle } from '../models/Vehicle.model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[];
  public word : string;

  constructor(private homeRegularService: HomeRegularService) { }

  ngOnInit() {
    this.callGetVehicle();
  }

  callGetVehicle(){
    this.homeRegularService.getAllVehicles()
    .subscribe(
      data => {
        this.vehicles = data;
      },
      error => {
        console.log(error);
      }
    )

    /*this.vehicles = [
      { TypeOfVehicle : "vechiletype1", Model : "M1", Manufactor : "Man1", Year : 2001, Image : "aaa", Description : "aaaa", PricePerHour : 100, ServerName : "1", Unavailable:false},
      { TypeOfVehicle : "vechiletype1", Model : "M2", Manufactor : "Man2", Year : 2011, Image : "aaa", Description : "aaaa", PricePerHour : 100, ServerName : "1", Unavailable:false},
      { TypeOfVehicle : "vechiletype2", Model : "M3", Manufactor : "Man3", Year : 2031, Image : "aaa", Description : "aaaa", PricePerHour : 100, ServerName : "1", Unavailable:true},
      { TypeOfVehicle : "vechiletype1", Model : "M4", Manufactor : "Man4", Year : 2021, Image : "aaa", Description : "aaaa", PricePerHour : 100, ServerName : "1", Unavailable:false}
    ];*/
  }

  UnavailableVehicle(veh : Vehicle){
    console.log(veh);
    debugger
    this.homeRegularService.unavailableVehicle(veh)
    .subscribe(
      data=> {
        alert("You have been successfully unavailable vehicle!");
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

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }
}
