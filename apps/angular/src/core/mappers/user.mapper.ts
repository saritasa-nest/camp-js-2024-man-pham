import { inject, Injectable } from '@angular/core';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { TMapper } from '@js-camp/core/models/mapper';
import { User } from '@js-camp/core/models/user';

import { DateTimeMapper } from './date-time.mapper';

/** User mapper. */
@Injectable({
	providedIn: 'root',
})
export class UserMapper implements TMapper<UserDto, User> {
	private readonly dateTimeMapper = inject(DateTimeMapper);

	/** @inheritdoc */
	public fromDto(dto: UserDto): User {
		return new User({
			email: dto.email,
			firstName: dto.first_name,
			lastName: dto.last_name,
			avatar: dto.avatar ?? '',
			createdAt: this.dateTimeMapper.fromDto(dto.created),
			modifiedAt: this.dateTimeMapper.fromDto(dto.modified),
		});
	}

	/** @inheritdoc */
	public toDto(model: User): UserDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatar,
			created: this.dateTimeMapper.toDto(model.createdAt),
			modified: this.dateTimeMapper.toDto(model.modifiedAt),
		};
	}
}
