import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { UserDto } from '@js-camp/core/dtos/user.dto';
import { User } from '@js-camp/core/models/user';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class UserApiService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly userMapper = inject(UserMapper);

	/**
	 * Get the anime page.
	 * @param filterParams Filter params.
	 * @returns The anime page.
	 */
	public getCurrentUser(): Observable<User> {
		return this.httpClient
			.get<UserDto>(this.appUrlsConfig.users.profile)
			.pipe(map(userDto => this.userMapper.fromDto(userDto)));
	}
}
