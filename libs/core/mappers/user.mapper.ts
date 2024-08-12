import { inject, Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';

import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user';

import { DateTimeMapper } from './date-time.mapper';

/** Anime mapper. */
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
			createdDate: this.dateTimeMapper.fromDto(dto.created),
			modifiedDate: this.dateTimeMapper.fromDto(dto.modified),
		});
	}

	/** @inheritdoc */
	public toDto(model: User): UserDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatar,
			created: this.dateTimeMapper.toDto(model.createdDate),
			modified: this.dateTimeMapper.toDto(model.modifiedDate),
		};
	}
}
