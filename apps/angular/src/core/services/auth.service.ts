import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';

import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';

import { UserSecretMapper } from '@js-camp/core/mappers/user-secret.mapper';

import { UserSecret } from '@js-camp/core/models/user-secret';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { Login } from '@js-camp/core/models/login';

/** Authentication service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginMapper = inject(LoginMapper);

	private readonly httpClient = inject(HttpClient);

	private readonly userSecretMapper = inject(UserSecretMapper);

	/**
	 * Login.
	 * @param loginData Email and password.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient.post<UserSecretDto>(this.appUrlConfig.auth.login, this.loginMapper.toDto(loginData)).pipe(
			map(secret => this.userSecretMapper.fromDto(secret)),
		);
	}
}
