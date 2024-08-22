import { Injectable } from '@angular/core';
import { RegisterDto } from '@js-camp/core/dtos/register.dto';
import { TMapperToDto } from '@js-camp/core/models/mapper';
import { Register } from '@js-camp/core/models/register';

/** Login mapper.  */
@Injectable({
	providedIn: 'root',
})
export class RegisterMapper implements TMapperToDto<RegisterDto, Register> {
	/** @inheritdoc */
	public toDto(model: Register): RegisterDto {
		return {
			email: model.email,
			password: model.password,
			first_name: model.firstName,
			last_name: model.lastName,
		};
	}
}
