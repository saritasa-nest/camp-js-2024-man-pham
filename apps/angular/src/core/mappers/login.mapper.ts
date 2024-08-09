import { Injectable } from '@angular/core';
import { LoginDto } from '@js-camp/core/dtos/login.dto';
import { TMapperToDto } from '@js-camp/core/models/mapper';

import { Login } from '../models/login';

/** Login mapper.  */
@Injectable({
	providedIn: 'root',
})
export class LoginMapper implements TMapperToDto<LoginDto, Login> {

	/** @inheritdoc */
	public toDto(data: Login): LoginDto {
		return {
			email: data.email.value,
			password: data.password.value,
		};
	}
}
