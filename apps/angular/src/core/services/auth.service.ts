import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';

import { UserSecretMapper } from '@js-camp/angular/core/mappers/user-secret.mapper';

import { UserSecret } from '@js-camp/core/models/user-secret';
import { Login } from '@js-camp/core/models/login';
import { Register } from '@js-camp/core/models/register';
import { ApiErrorResponseWithDetails } from '@js-camp/core/models/api-error-response';

import { ApiErrorResponseMapper } from '../mappers/api-error-response.mapper';
import { RegisterMapper } from '../mappers/register.mapper';
import { LoginMapper } from '../mappers/login.mapper';

/** Authentication service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginMapper = inject(LoginMapper);

	private readonly apiErrorResponseMapper = inject(ApiErrorResponseMapper);

	private readonly registerMapper = inject(RegisterMapper);

	private readonly httpClient = inject(HttpClient);

	private readonly userSecretMapper = inject(UserSecretMapper);

	/**
	 * Login.
	 * @param loginData Email and password.
	 */
	public login(loginData: Login): Observable<UserSecret> {
		return this.httpClient.post<UserSecretDto>(this.appUrlConfig.auth.login, this.loginMapper.toDto(loginData)).pipe(
			catchError((error: unknown) => this.handleError(error)),
			map(secret => this.userSecretMapper.fromDto(secret)),
		);
	}

	/**
	 * Registers user with the provided credentials.
	 * @param registerData Registration data of user.
	 */
	public register(registerData: Register): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.register, this.registerMapper.toDto(registerData))
			.pipe(
				catchError((error: unknown) => this.handleError(error)),
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

	private handleError(error: unknown): Observable<never> {
		if (error instanceof HttpErrorResponse) {
			const mappedError = this.apiErrorResponseMapper.fromDto(error.error);
			return throwError(() => new ApiErrorResponseWithDetails(mappedError));
		}
		return throwError(() => new Error('Unknown error'));
	}
}
