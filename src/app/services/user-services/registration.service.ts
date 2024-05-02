import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  user = new User();

  constructor(private http : HttpClient) { }

public registerUserFromRemote(user : User):Observable<any>{
    return this.http.post<any>(`${NAV_URL}/signup`,user)
}


}
