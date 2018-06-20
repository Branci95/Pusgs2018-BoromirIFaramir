import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor() {}

  canActivate() {
      if(localStorage.role == "Admin" || localStorage.role == "Manager"){
        return true;
      }
      else{
        return false;
      }

  }
}