import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Vehicle } from 'src/app/models/Vehicle.model';
import { Services } from 'src/app/models/Services.model';

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

    getAllServicesUna() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/Services/GetServiceUnAva');
    }

    getAllUsersUna() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/AppUser/GetAppUserUnAva');
    }

    getAllBranches() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/Branches');
    }

    getAllVehicles() : Observable<any>{
      return this.httpClient.get('http://localhost:51680/api/Vehicles');
    }

    getMethodVehiclePag(pageNumber): Observable<Services[]> {
      return this.http.get('http://localhost:51680/api/Services?pageIndex='+pageNumber+'&pageSize='+2)
        .map(this.parseData)
        .catch(this.handleError);
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
      return this.httpClient.get(`http://localhost:51680/api/Services/Grade?id=${id}&grade=${grade}&user=${localStorage}`);
    }

    unavailableVehicle(unaVehicle) : Observable<any>{
      return this.httpClient.get(`http://localhost:51680/api/Vehicles/Unavailable?id=${unaVehicle}`);
    }

    searchVehicle(name, option) : Observable<any>{
      return this.httpClient.get(`http://localhost:51680/api/Vehicles/SearchVehicle?name=${name}&opt=${option}`);
    }
}
