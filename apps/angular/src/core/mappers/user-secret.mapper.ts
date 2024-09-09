import { Injectable } from '@angular/core';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { TMapper } from '@js-camp/core/models/mapper';
import { UserSecret } from '@js-camp/core/models/user-secret';

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
