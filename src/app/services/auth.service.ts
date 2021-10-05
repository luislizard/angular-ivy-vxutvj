import {environment} from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: localStorage.getItem(environment.LOCALSTORAGE_IDENTIFIER)
    })
  };
    constructor(private http: HttpClient) {}

    async loginByAuth(email: string, password: string): Promise<any> {
        const {token} = await this.http
            .post(`${environment.API_URL}/auth/login`, {
                email,
                password
            })
            .toPromise()
            .then((res: any) => res);

        localStorage.setItem(environment.LOCALSTORAGE_IDENTIFIER, token);

        return token;
    }

    async registerByAuth(email: string, password: string): Promise<string> {
        const {token} = await this.http
            .post(`${environment.API_URL}/auth/register`, {
                email,
                password
            })
            .toPromise()
            .then((res: any) => res);

        localStorage.setItem(environment.LOCALSTORAGE_IDENTIFIER, token);

        return token;
    }


}
