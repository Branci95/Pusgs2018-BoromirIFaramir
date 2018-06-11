import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(f.value.adress, f.value.latitude,f.value.longitude);
  }
}
