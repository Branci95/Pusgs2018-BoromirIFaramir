import { Component, OnInit } from '@angular/core';
import { HomeRegularService } from '../services/home-regular.service';
import { Branch } from '../models/Branch.model';

import { MapInfo } from '../models/map-info.model';
import { Marker } from '../models/marker.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  braches: Branch[];

  mapInfo: MapInfo;
  public lat: number = -1;
  public lgt: number = -1;

  private markers: Marker[] = [];
  private marker: Marker = new Marker(0,0);
  private Tempmarker: Marker = new Marker(0,0);

  constructor(private homeRegularService: HomeRegularService) {
    this.mapInfo = new MapInfo(45.25800424228705, 19.833547029022156, 
      "assets/ftn.png",
      "Novi Sad" , "" , "");
   }

  ngOnInit() {
    this.callGetBranch();
  }

  selectMarker(markerr: Marker){
    this.braches.forEach(obj => {
      if(obj.Latitude == markerr.Lat && obj.Longitude == markerr.Lgt){
        debugger
      }
    })
  }
  
  callGetBranch(){
    this.homeRegularService.getAllBranches()
    .subscribe(
      data => {
        this.braches = data;
        if(this.braches.length > 0){
          this.braches.forEach(obj => {
            this.marker = new Marker(obj.Latitude, obj.Longitude);
            this.markers.push(this.marker);
          })
        }
      },
      error => {
        alert(error);
      }
    )

    /*this.braches = [
      { Address : "braches1", Logo : "aaaa", Latitude : 45.24930344822965, Longitude : 19.833547029022156, ServerName : "1"},
      { Address : "braches2", Logo : "aaaa", Latitude : 45.244227369427385, Longitude : 19.812089356903016, ServerName : "1"},
      { Address : "braches3", Logo : "aaaa", Latitude : 45.26464978411942, Longitude : 19.832517060760438, ServerName : "1"},
      { Address : "braches4", Logo : "aaaa", Latitude : 45.25595000834916, Longitude : 19.868565949920594, ServerName : "1"}
    ];
*/

    
    /*this.braches.forEach(obj => {
      this.marker = new Marker(obj.Latitude, obj.Longitude);
      this.markers.push(this.marker);
    })*/
  }

  deleteBranch(del) {
    console.log(del);
    this.homeRegularService.deleteBranch(del)
    .subscribe(
      data=> {
        alert("You have been successfully delete branch!");
        this.callGetBranch();
      },
    error=>{
      alert(error);
    })
  }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }
}
