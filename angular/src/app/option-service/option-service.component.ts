import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-option-service',
  templateUrl: './option-service.component.html',
  styleUrls: ['./option-service.component.css']
})
export class OptionServiceComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe();
   }

  ngOnInit() {
  }

}
