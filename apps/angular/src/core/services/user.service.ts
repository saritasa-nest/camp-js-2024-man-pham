import { inject, Injectable } from '@angular/core';
import {
	first,
	ignoreElements,
	map,
	merge,
	Observable,
	OperatorFunction,
	pipe,
	switchMap,
} from 'rxjs';

import { UserSecret } from '@js-camp/core/models/user-secret';

import { Login } from '@js-camp/core/models/login';

import { AuthService } from './auth.service';
import { UserSecretStorageService } from './user-secret-storage.service';

/**
 * Stateful service for storing/managing information about the current user.
 */
@Injectable({
	providedIn: 'root',
})
export class UserService {
	/** Current user. `null` when a user is not logged in. */
	// public readonly currentUser$: Observable<User | null>;

	/** Whether the current user is authorized. */
	public readonly isAuthorized$: Observable<boolean>;

	private readonly authService = inject(AuthService);

	private readonly userSecretStorage = inject(UserSecretStorageService);

	public constructor() {
		this.isAuthorized$ = this.userSecretStorage.currentSecret$.pipe(map(secret => secret != null));
	}

	/**
	 * Logs the user via service.
	 * @param loginData Login data.
	 */
	public login(loginData: Login): Observable<void> {
		return this.authService.login(loginData).pipe(
			this.saveSecretAndWaitForAuthorized(),
		);
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

	/* private initCurrentUserStream(): Observable<User | null> {
		return this.userSecretStorage.currentSecret$.pipe(
			switchMap(secret => (secret ? this.userApiService.getCurrentUser() : of(null))),
			shareReplay({ bufferSize: 1, refCount: false }),
		);
	} */
}
