import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Login } from '../models/login';
import { LoginMapper } from '../mappers/login.mapper';

/** Authentication service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginMapper = inject(LoginMapper);

	private readonly httpClient = inject(HttpClient);

	/**
	 * Login.
	 * @param loginData Email and password.
	 */
	public login(loginData: Login): Observable<unknown> {
		return this.httpClient.post(this.appUrlConfig.auth.login, this.loginMapper.toDto(loginData));
	}
}
