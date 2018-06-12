import { Component, OnInit } from '@angular/core';
import { ListServicesService } from 'src/app/services/list-services.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-home-regular',
  templateUrl: './home-regular.component.html',
  styleUrls: ['./home-regular.component.css'],
  providers: [ListServicesService]
})
export class HomeRegularComponent implements OnInit {

  public services:Observable<any>;

  constructor(private listServicesService: ListServicesService) { }

  ngOnInit() {
    this.callGet();
  }

  callGet(){
    this.listServicesService.getAllServices()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
