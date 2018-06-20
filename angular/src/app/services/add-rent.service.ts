import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Rent } from 'src/app/models/Rent.model';



@Injectable({
  providedIn: 'root'
})
export class AddRentService {

  constructor(private http: Http, private httpClient: HttpClient) {
    
   }
  
    private parseData(res: Response) {
      return res.json() || [];
    }
  
    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }
    

    public getAllBranches(id) : Observable<any>{
      return this.httpClient.get(`http://localhost:51680/api/Branches/ReturnBranchesByServer?model=${id.id}`);
    }
    
    public postRent(rent:Rent) : Observable<any>{
      return this.httpClient.post('http://localhost:51680/api/Rents', rent);
    }

    public getAllVehicle(id) : Observable<any>{
      return this.httpClient.get(`http://localhost:51680/api/Vehicle/ReturnVehiclesByServer?model=${id.id}`);
    }
}
