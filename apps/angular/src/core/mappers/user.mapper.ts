import { inject, Injectable } from '@angular/core';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { DateTimeMapper } from '@js-camp/core/mappers/date-time.mapper';
import { TMapper } from '@js-camp/core/models/mapper';
import { User } from '@js-camp/core/models/user';

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
