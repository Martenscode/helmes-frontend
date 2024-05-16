import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector, UserDataDTO } from '../features/user-form/user-form.model';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  
    formEndpoint = "http://localhost:8080/api/v1/form";

    constructor(private http: HttpClient) { }

    getSectors(): Observable<Sector[]> {
        return this.http.get<any>(this.formEndpoint);
    }

    postUserResponse(requestBody: UserDataDTO): Observable<UserDataDTO> {
      return this.http.post<any>(this.formEndpoint, requestBody);
    }

}
