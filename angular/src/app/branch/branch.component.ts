import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddBranchService } from 'src/app/services/add-branch.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
 
import { Branch } from '../models/Branch.model'
import { Services } from '../models/Services.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';
 
const URL = 'http://localhost:51680/api/Upload/user/PostBranchImage';
 
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
 
  branch: Branch[];
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;
 
  constructor(private addBranchService : AddBranchService) {
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);  
    };
  }
 
  uploadFile: any;
  services: Services[];
 
  ngOnInit() {
    this.callGetServices();
  }
 
  onSubmit(branch: Branch, form: NgForm) {
    console.log(branch);
    branch.Logo=this.url;
    this.addBranchService.postBranch(branch)
    .subscribe(
      data=> {
        alert("You have been successfully add branch!");
        form.reset();
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