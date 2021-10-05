import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private auth: AuthService, private http: HttpClient) {}

    async getProfile() {
        return await this.http
            .get(`${environment.API_URL}/user/profile`, this.auth.httpOptions)
            .toPromise()
            .then((res: any) => res);
    }
}
