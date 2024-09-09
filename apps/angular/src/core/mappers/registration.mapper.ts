import { Injectable } from '@angular/core';
import { RegistrationDto } from '@js-camp/core/dtos/registration.dto';
import { TMapperToDto } from '@js-camp/core/models/mapper';
import { Registration } from '@js-camp/core/models/registration';

/** Registration mapper.  */
@Injectable({
	providedIn: 'root',
})
export class RegistrationMapper implements TMapperToDto<RegistrationDto, Registration> {
	/** @inheritdoc */
	public toDto(model: Registration): RegistrationDto {
		return {
			email: model.email,
			password: model.password,
			first_name: model.firstName,
			last_name: model.lastName,
		};
	}
}
