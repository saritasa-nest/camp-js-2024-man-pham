import { Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';
import { UserSecretDto } from '../dtos/user-secret.dto';
import { UserSecret } from '../models/user-secret';

/** User secret mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserSecretMapper implements TMapper<UserSecretDto, UserSecret> {
	/** @inheritdoc */
	public fromDto(dto: UserSecretDto): UserSecret {
		return new UserSecret({
			refreshToken: dto.refresh,
			accessToken: dto.access,
		});
	}

	/** @inheritdoc */
	public toDto(data: UserSecret): UserSecretDto {
		return {
			access: data.accessToken,
			refresh: data.refreshToken,
		};
	}
}
