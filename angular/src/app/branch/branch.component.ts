import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddBranchService } from 'src/app/services/add-branch.service';

import { Branch } from '../models/Branch.model'
import { error } from 'selenium-webdriver';
import { debug } from 'util';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  constructor(private addBranchService : AddBranchService) { }

  ngOnInit() {
  }

  onSubmit(branch: Branch) {
    debugger
    console.log(branch);
    this.addBranchService.postBranch(branch)
    .subscribe(
      data=> {
        alert("You have been successfully add branch!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }
}
