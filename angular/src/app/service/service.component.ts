import { Component, OnInit } from '@angular/core';
import { Services } from '../models/Services.model';
import { HomeRegularService } from '../services/home-regular.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services: Services[];
  selected: number;

  constructor(private homeRegularService: HomeRegularService) { }

  ngOnInit() {
    this.callGetServices();
  }

  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }

  gradeService(id){
    this.homeRegularService.gradeService(id, this.selected)
     .subscribe(
        data => {
          console.log("You have succesfully graded service");
        },
        error => {
          console.log(error);
        }
     )
  }

  callGetServices(){
    this.homeRegularService.getAllServices()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )

    /*this.services = [
      { Name : "service1", Logo : "aaaa", Email : "aaa@aaa.aaa", Description : "aaa", Approved : false},
      { Name : "service2", Logo : "aaaa", Email : "aaa@aaa.aaa", Description : "aaa", Approved : false},
      { Name : "service3", Logo : "aaaa", Email : "aaa@aaa.aaa", Description : "aaa", Approved : false},
      { Name : "service4", Logo : "aaaa", Email : "aaa@aaa.aaa", Description : "aaa", Approved : false}
    ];*/

  }
  
  deleteService(del) {
    console.log(del);
    this.homeRegularService.deleteService(del)
    .subscribe(
      data=> {
        alert("You have been successfully delete service!");
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
