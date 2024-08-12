import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppConfig } from '@js-camp/angular/app/shared/app-config';
import { Observable } from 'rxjs';

const API_KEY_HEADER_KEY = 'Api-key';

/** Api key interceptor. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
	private readonly appConfig = inject(AppConfig);

	/** @inheritdoc */
	public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		/** Add a new API key header to the request. */
		const apiKeyReq = req.clone({
			headers: req.headers.set(API_KEY_HEADER_KEY, this.appConfig.apiKey),
		});

		/** Send cloned request with header to the next handler. */
		return next.handle(apiKeyReq);
	}
}
