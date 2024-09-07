import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { UserSecret } from '@js-camp/core/models/user-secret';

import { StorageService } from './storage.service';

const USER_SECRET_STORAGE_KEY = 'user';

/** User secret storage service. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretStorageService {
	/** Secret info of current user. */
	public readonly currentSecret$: Observable<UserSecret | null>;

	private readonly storageService = inject(StorageService);

	public constructor() {
		this.currentSecret$ = this.storageService.get(USER_SECRET_STORAGE_KEY);
	}

	/**
	 * Save user secret.
	 * @param secret Secret to save.
	 */
	public saveSecret(secret: UserSecret): Observable<UserSecret> {
		return this.storageService.save(USER_SECRET_STORAGE_KEY, secret).pipe(map(() => secret));
	}

	/** Remove current secret. */
	public removeSecret(): Observable<void> {
		return this.storageService.remove(USER_SECRET_STORAGE_KEY);
	}
}
