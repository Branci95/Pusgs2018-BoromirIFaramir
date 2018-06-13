import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddBranchService {

  constructor(private http: Http, private httpClient: HttpClient) { }
  
    private parseData(res: Response) {
      return res.json() || [];
    }
  
    private handleError(error: Response | any) {
      let errorMessage: string;
      errorMessage = error.message ? error.message : error.toString();
      return Observable.throw(errorMessage);
    }

    postBranch(newBranch) : Observable<any>{
      return this.httpClient.post('http://localhost:51680/api/Branches', newBranch);
    }
}
