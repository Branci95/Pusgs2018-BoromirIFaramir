import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddServiceService } from 'src/app/services/add-service.service';

import { Services } from '../models/Services.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  constructor(private addServiceService : AddServiceService) { }

  ngOnInit() {
  }

  onSubmit(service: Services) {
    console.log(service);
    this.addServiceService.postService(service)
    .subscribe(
      data=> {
        alert("You have been successfully add service!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }
}
