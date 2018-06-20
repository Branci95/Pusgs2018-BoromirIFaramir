import { Component, OnInit } from '@angular/core';
import { Users, ChangePassword } from 'src/app/models/User.model';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { FileUploader } from 'ng2-file-upload';
import { AppUsers } from 'src/app/models/AppUsers.model';

const URL = 'http://localhost:51680/api/Upload/user/PostUserImage';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: Users;
  currentEmail : string;
  public changePass : boolean;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  url: string;

  constructor(private loginServiceService: LoginServiceService) { 
    this.changePass = false;
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any,status: any, headers: any) => {
        this.url=JSON.parse(response);        
    };
  }

  handleUpload(data): void{
    if(data && data.response){
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  uploadFile: any;

  ngOnInit() {
    this.GetUserData();
  }

  ChangeData(userData: AppUsers){
    console.log(userData);
    userData.Logo=this.url;
    userData.Email = localStorage.getItem('email');
    this.loginServiceService.ChangeUserData(userData)
    .subscribe(
      data=> {
        alert("You have been successfully change data!");
      },
    error=>{
      console.log(error);
      alert("Fail !");
    })
  }

  ChangePass(passwordsNew: ChangePassword){
    passwordsNew.Email = localStorage.getItem('email');
    this.loginServiceService.ChangeUserPassword(passwordsNew)
    .subscribe(
      data => {
        alert("You have been successfully change password!");
      },
      error => {
        alert("change password wrong!");
        console.log(error);
      }
    )
  }


  ChangePassword(){
    this.changePass = !this.changePass;
  }

  GetUserData(){
    this.currentEmail = localStorage.getItem("email");
    this.loginServiceService.getUserData(this.currentEmail)
    .subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  isInRole(r: string){
    if(localStorage.getItem('role') == r){
      return true;
    }

    return false;
  }
}
