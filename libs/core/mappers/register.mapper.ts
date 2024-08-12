import { Injectable } from '@angular/core';

import { TMapperToDto } from '../models/mapper';
import { RegisterDto } from '../dtos/register.dto';
import { Register } from '../models/register';

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
