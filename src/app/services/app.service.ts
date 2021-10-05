import { UserService } from './user.service';
import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router, private toastr: ToastrService, private auth: AuthService, private userService: UserService) {}

    async loginByAuth({email, password}) {
        try {
            const token = await this.auth.loginByAuth(email, password);
            localStorage.setItem(environment.LOCALSTORAGE_IDENTIFIER, token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.response.data.message);
        }
    }

    async registerByAuth({email, password}) {
        try {
            const token = await this.auth.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.response.data.message);
        }
    }

    async getProfile() {
        try {
            this.user = await this.userService.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
        console.log(this.user)
    }

    logout() {
        localStorage.removeItem(environment.LOCALSTORAGE_IDENTIFIER);
        this.user = null;
        this.router.navigate(['/login']);
    }
}
