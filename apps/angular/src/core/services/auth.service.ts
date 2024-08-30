import { inject, Injectable } from '@angular/core';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';

import { UserSecretMapper } from '@js-camp/angular/core/mappers/user-secret.mapper';

import { UserSecret } from '@js-camp/core/models/user-secret';
import { Login } from '@js-camp/core/models/login';
import { ApiErrorResponseWithDetails } from '@js-camp/core/models/api-error-response';

import { Registration } from '@js-camp/core/models/registration';

import { ApiErrorResponseMapper } from '../mappers/api-error-response.mapper';
import { LoginMapper } from '../mappers/login.mapper';
import { RegistrationMapper } from '../mappers/registration.mapper';

/** Authentication service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly loginMapper = inject(LoginMapper);

	private readonly apiErrorResponseMapper = inject(ApiErrorResponseMapper);

	private readonly registrationMapper = inject(RegistrationMapper);

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
	 * @param registrationData Registration data of user.
	 */
	public register(registrationData: Registration): Observable<UserSecret> {
		return this.httpClient
			.post<UserSecretDto>(this.appUrlConfig.auth.register, this.registrationMapper.toDto(registrationData))
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
