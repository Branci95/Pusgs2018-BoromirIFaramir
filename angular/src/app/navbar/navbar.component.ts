import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe();
   }

  ngOnInit() {

  }

  checkIfLogin(){
    return localStorage.jwt;
  }

  logOut(){
    if(localStorage.jwt){
      localStorage.clear();
    }
  }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }
}
