import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';

@Injectable({
  providedIn: 'root'
})
export class HomeRegularService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }
  
    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }

    getAllServices() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/Services');
    }

    getAllBranches() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/Branches');
    }

    getAllVehicles() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/Vehicles');
    }

    deleteService(delService) : Observable<any>{
      return this.httpClient.delete(`http://localhost:51680/api/Services?id=${delService}`);
    }

    deleteBranch(delBranch) : Observable<any>{
      return this.httpClient.delete(`http://localhost:51680/api/Branches?id=${delBranch}`);
    }

    deleteVehicle(delVehicle) : Observable<any>{
      return this.httpClient.delete(`http://localhost:51680/api/Vehicles?id=${delVehicle}`);
    }

    gradeService(id, grade, localStorage) : Observable<any>{
      debugger
      return this.httpClient.get(`http://localhost:51680/api/Services/Grade?id=${id}&grade=${grade}&user=${localStorage}`);
    }

    unavailableVehicle(unaVehicle) : Observable<any>{                       //videti za ovo sta bi trebalo
      debugger
      return// this.httpClient.post(`http://localhost:51680/api/Vehicles?id=${unaVehicle}`);
    }

    searchVehicle(name, option) : Observable<any>{
      return this.httpClient.get(`http://localhost:51680/api/Vehicles/SearchVehicle?name=${name}&opt=${option}`);
    }
}
