import {
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { UserSecret } from '@js-camp/core/models/user-secret';

import { UserSecretStorageService } from '../services/user-secret-storage.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

/** Adds JWT to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	private readonly userSecretStorage = inject(UserSecretStorageService);

	/** @inheritdoc */
	public intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		const userSecret$ = this.userSecretStorage.currentSecret$.pipe(first());

		return userSecret$.pipe(
			map(userSecret =>
				userSecret ?
					req.clone({
						headers: this.appendAuthorizationHeader(
							req.headers,
							userSecret,
						),
					}) :
					req),
			switchMap(newReq => next.handle(newReq)),
		);

	}

	/**
	 * Appends authorization header to a list of `headers`.
	 * @param headers Headers list.
	 * @param userSecret User secret.
	 */
	private appendAuthorizationHeader(
		headers: HttpHeaders,
		userSecret: UserSecret,
	): HttpHeaders {
		return headers.set(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${userSecret.accessToken}`);
	}
}
