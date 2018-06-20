import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddServiceService } from 'src/app/services/add-service.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { Services } from '../models/Services.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

import {Router} from '@angular/router';

const URL = 'http://localhost:51680/api/Upload/user/PostUserImage';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  services: Services[];
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;

  constructor(private addServiceService : AddServiceService , private router: Router) { 
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);        
    };
  }

  uploadFile: any;

  ngOnInit() {
  }

  onSubmit(service: Services, form: NgForm) {
    console.log(service);
    service.Logo=this.url;
    this.addServiceService.postService(service)
    .subscribe(
      data=> {
        alert("You have been successfully add service!");

        this.router.navigate(['/services']);

      },
    error=>{
      console.log(error);
        alert("Fail !");
    })
  }

  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }
}
