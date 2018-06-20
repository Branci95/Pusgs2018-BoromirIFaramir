import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddBranchService } from 'src/app/services/add-branch.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
 
import { Branch } from '../models/Branch.model'
import { Services } from '../models/Services.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

import { MapInfo } from '../models/map-info.model';
import { Marker } from '../models/marker.model';

import {Router} from '@angular/router';
 
const URL = 'http://localhost:51680/api/Upload/user/PostBranchImage';
 
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class AddBranchComponent implements OnInit {
 
  branch: Branch[];
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;

  mapInfo: MapInfo;
  public lat: number = -1;
  public lgt: number = -1;

  private markers: Marker[] = [];
  private marker: Marker = new Marker(0,0);
  public tempMarker: Marker = new Marker(0, 0);
 
  constructor(private addBranchService : AddBranchService, private router: Router) {
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);  
    };

    this.mapInfo = new MapInfo(45.25800424228705, 19.833547029022156, 
      "assets/ftn.png",
      "Novi Sad" , "" , "");
  }

  placeMarker($event){
    this.tempMarker.Lat = $event.coords.lat;
    this.tempMarker.Lgt = $event.coords.lng;
    this.lat = $event.coords.lat;
    this.lgt = $event.coords.lng;
  }
 
  uploadFile: any;
  services: Services[];
 
  ngOnInit() {
    this.callGetServices();
  }
 
  onSubmit(branch: Branch, form: NgForm) {
    console.log(branch);
    branch.Logo=this.url;
    debugger
    this.addBranchService.postBranch(branch)
    .subscribe(
      data=> {
        alert("You have been successfully add branch!");
        this.router.navigate(['/branch']);
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

  callGetServices(){
    this.addBranchService.getListOfServers()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )
  }
 
  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
}