import { Component, OnInit } from '@angular/core';

import { MapInfo } from '../models/map-info.model';
import { Marker } from '../models/marker.model';
import { Rent } from 'src/app/models/Rent.model';
import { AddRentService } from 'src/app/services/add-rent.service';
import { ActivatedRoute } from '@angular/router'
import { Branch } from 'src/app/models/Branch.model';
import { Vehicle } from 'src/app/models/Vehicle.model';

@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.css']
})
export class AddRentComponent implements OnInit {

  rent : Rent;
  public idServe: any;
  braches: Branch[];
  Tempvehicle: Vehicle[];
  vehicle: Vehicle[];

  
  
  mapInfo: MapInfo;
  public lat: number = -1;
  public lgt: number = -1;

  private markers: Marker[] = [];
  private marker: Marker = new Marker(0,0);
  public tempMarker: Marker = new Marker(0, 0);

  constructor(private addRentService: AddRentService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.idServe = params);
    this.mapInfo = new MapInfo(45.25800424228705, 19.833547029022156, 
      "assets/ftn.png",
      "Novi Sad" , "" , "");
    }

  ngOnInit() {
    this.callGetBranch();
  }

  callGetBranch(){
    this.addRentService.getAllBranches(this.idServe)
    .subscribe(
      data => {
        this.braches = data;
        this.braches.forEach(obj => {
          this.marker = new Marker(obj.Latitude, obj.Longitude);
          this.markers.push(this.marker);
        })
      },
      error => {
        console.log(error);
      }
    )

    this.addRentService.getAllVehicle(this.idServe)
    .subscribe(
      data => {
        this.vehicle = []
        this.Tempvehicle = data;
        debugger
        this.Tempvehicle.forEach(obj => {
          debugger
          if(obj.Unavailable==false){
            debugger
            this.vehicle.push(obj);
          }
        })
      },
      error => {
        console.log(error);
      }
    )

    

    this.braches.forEach(obj => {
      this.marker = new Marker(obj.Latitude, obj.Longitude);
      this.markers.push(this.marker);
    })
  }

  /*callGetVehicle(){
    this.addRentService.getAllVehicle(this.idServe)
    .subscribe(
      data => {
        this.vehicle = data;
      },
      error => {
        console.log(error);
      }
    )
  }*/

  static idBranch: number;

  selectMarker(markerr: Marker){
    this.braches.forEach(obj => {
      if(obj.Latitude == markerr.Lat && obj.Longitude == markerr.Lgt){
        this.rent = new Rent(obj.Id);
      }
    })
  }

  onSubmit(rentt:Rent){
    this.rent.End = rentt.End;
    this.rent.User = localStorage.email;
    this.rent.Vehicle = rentt.Vehicle;
    
    this.addRentService.postRent(this.rent)
    .subscribe(
      data => {
        this.vehicle = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
