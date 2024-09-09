import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, shareReplay, switchMap, tap } from 'rxjs';

import { UserService } from '../services/user.service';

/** Refresh interceptor. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
	private readonly userService = inject(UserService);

	private refreshSecretReq$: Observable<void> | null = null;

	/** @inheritdoc */
	public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError(() => {
				this.refreshSecretReq$ ??= this.userService.refresh().pipe(shareReplay({ refCount: true, bufferSize: 1 }));

				return this.refreshSecretReq$.pipe(
					tap(() => {
						this.refreshSecretReq$ = null;
					}),
					switchMap(() => next.handle(req)),
				);
			}),
		);
	}
}
