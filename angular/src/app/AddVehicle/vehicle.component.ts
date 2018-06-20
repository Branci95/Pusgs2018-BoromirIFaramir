import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddVehicleService } from 'src/app/services/add-vehicle.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { Vehicle } from '../models/Vehicle.model'
import { TypeOfVehicle } from '../models/TypeOfVehicle.model'
import { Services } from '../models/Services.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

import {Router} from '@angular/router';

const URL = 'http://localhost:51680/api/Upload/user/PostBranchImage';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  typeOfVehicle: TypeOfVehicle[];
  services : Services[];

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;

  constructor(private addVehicleService : AddVehicleService, private router: Router) {
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);  
    };
   }

  ngOnInit() {
    this.callGetType();
    this.callGetServices();
  }

  uploadFile: any;

  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
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
    console.log(vehicle);
    vehicle.Image = this.url;
    this.addVehicleService.postVehicle(vehicle)
    .subscribe(
      data=> {
        alert("You have been successfully add vehicle!");
        this.router.navigate(['/services']);
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }
}
