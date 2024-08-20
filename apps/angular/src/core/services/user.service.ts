import { inject, Injectable } from '@angular/core';
import {
	catchError,
	first,
	ignoreElements,
	map,
	merge,
	Observable,
	of,
	OperatorFunction,
	pipe,
	shareReplay,
	switchMap,
	throwError,
} from 'rxjs';

import { UserSecret } from '@js-camp/core/models/user-secret';

import { Login } from '@js-camp/core/models/login';

import { User } from '@js-camp/core/models/user';

import { Register } from '@js-camp/core/models/register';

import { UserApiService } from './user-api.service';

import { AuthService } from './auth.service';
import { UserSecretStorageService } from './user-secret-storage.service';

/** User service. */
@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly authService = inject(AuthService);

	private readonly userApiService = inject(UserApiService);

	private readonly userSecretStorage = inject(UserSecretStorageService);

	/** Current user. `null` when a user is not logged in. */
	public readonly currentUser$: Observable<User | null>;

	/** Whether the current user is authorized. */
	public readonly isAuthorized$: Observable<boolean>;

	public constructor() {
		this.currentUser$ = this.initCurrentUserStream();
		this.isAuthorized$ = this.currentUser$.pipe(map(user => user != null));
	}

	private saveSecretAndWaitForAuthorized(): OperatorFunction<UserSecret, void> {
		return pipe(
			switchMap(secret => {
				const saveUserSecretSideEffect$ = this.userSecretStorage.saveSecret(secret).pipe(ignoreElements());

				return merge(this.isAuthorized$, saveUserSecretSideEffect$);
			}),
			first(isAuthorized => isAuthorized),
			map(() => undefined),
		);
	}

	private initCurrentUserStream(): Observable<User | null> {
		return this.userSecretStorage.currentSecret$.pipe(
			switchMap(secret => (secret ? this.userApiService.getCurrentUser() : of(null))),
			shareReplay({ bufferSize: 1, refCount: false }),
		);
	}

	/**
	 * Logs the user via service.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	/**
	 * Create new account via service.
	 * @param registerData Register data.
	 */
	public register(registerData: Register): Observable<void> {
		return this.authService.register(registerData).pipe(this.saveSecretAndWaitForAuthorized());
	}

	/** Logs the current user. */
	public logout(): Observable<void> {
		return this.userSecretStorage.removeSecret();
	}

	/** Refreshes the secret via service. */
	public refresh(): Observable<void> {
		return this.userSecretStorage.currentSecret$.pipe(
			first(),
			switchMap(secret =>
				secret != null ? this.authService.refreshSecret(secret) : throwError(() => new Error('No refresh token found'))),
			catchError(() => this.logout()),
			switchMap(newSecret => (newSecret ? this.userSecretStorage.saveSecret(newSecret) : of(null))),
			map(() => undefined),
		);
	}
}
