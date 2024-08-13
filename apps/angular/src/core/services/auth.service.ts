import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';

import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';

import { UserSecretMapper } from '@js-camp/core/mappers/user-secret.mapper';

import { UserSecret } from '@js-camp/core/models/user-secret';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { Login } from '@js-camp/core/models/login';
import { Register } from '@js-camp/core/models/register';
import { RegisterMapper } from '@js-camp/core/mappers/register.mapper';

/** Authentication service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginMapper = inject(LoginMapper);

	private readonly registerMapper = inject(RegisterMapper);

	private readonly httpClient = inject(HttpClient);

	private readonly userSecretMapper = inject(UserSecretMapper);

	/**
	 * Login.
	 * @param loginData Email and password.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.login, this.loginMapper.toDto(loginData))
			.pipe(map(secret => this.userSecretMapper.fromDto(secret)));
	}

	/**
	 * Registers user with the provided credentials.
	 * @param registerData Registration data of user.
	 */
	public register(registerData: Register): Observable<UserSecret> {
		return this.httpClient.post<UserSecretDto>(this.appUrlConfig.auth.register, this.registerMapper.toDto(registerData)).pipe(
			map(secret => this.userSecretMapper.fromDto(secret)),
		);
	}

	/**
	 * Refresh the user secret.
	 * @param secret User secret.
	 */
	public refreshSecret(secret: UserSecret): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.token.refresh, this.userSecretMapper.toDto(secret))
			.pipe(map(token => this.userSecretMapper.fromDto(token)));
	}
}
