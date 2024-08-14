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

import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';

import { isUrlInConfig, UrlConfig } from '@js-camp/core/utils/check-url-in-config';

import { UserSecretStorageService } from '../services/user-secret-storage.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

/** Adds JWT to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly appUrlConfig = inject(AppUrlsConfig);

	private readonly userSecretStorage = inject(UserSecretStorageService);

	/** @inheritdoc */
	public intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		if (this.shouldInterceptSecretForUrl(req.url, [this.appUrlConfig.auth, this.appUrlConfig.anime.list])) {
			return next.handle(req);
		}
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

	private shouldInterceptSecretForUrl(url: string, configs: UrlConfig[]): boolean {
		return configs.some(config => isUrlInConfig(url, config));
	}

}
