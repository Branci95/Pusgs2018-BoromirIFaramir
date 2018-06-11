import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(f.value.type, f.value.model,f.value.manufacture);
  }
}
