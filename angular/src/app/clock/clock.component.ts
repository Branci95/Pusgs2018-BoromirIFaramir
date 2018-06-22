import {  
  Component,  
  NgZone  
} from '@angular/core';  
import {  
  SignalRService  
} from '../services/signalR.service';  
import {  
  GetClockTime  
} from '../models/get-clock-time';  
// decorator section comprised of selector and view template  
@Component({  
  selector: 'clock-component',  
  templateUrl: './clock.component.html'
})  
export class ClockComponent {  
    // public variables declaration  
    public currentMessage: string;  
    public allMessages: string;  
    public canSendMessage: Boolean;  
    // constructor of the class to inject the service in the constuctor and call events.  
    constructor(private _signalRService: SignalRService, private _ngZone: NgZone) {    
        this.canSendMessage = false;  
      }
    ngOnInit()
    {
      this.checkConnection();
      this.subscribeForNotifications();
    }
   
    private checkConnection(){
      this._signalRService.connectionEstablished.subscribe(e => {this.canSendMessage = e;
          if (e) {
            this._signalRService.sendHello()
          }
      });
    }
   
    private subscribeForNotifications () {
      this._signalRService.messageReceived.subscribe(e => this.onNotification(e));
    }
   
    public onNotification(notif: string) {
      debugger
           this._ngZone.run(() => {
             debugger;
             if(localStorage.role == 'Admin'){
               alert(notif);
             }
          });  
    }
  }