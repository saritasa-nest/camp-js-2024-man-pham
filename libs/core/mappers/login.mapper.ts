import { Injectable } from '@angular/core';

import { LoginDto } from '../dtos/login.dto';
import { TMapperToDto } from '../models/mapper';
import { Login } from '../models/login';

/** Login mapper.  */
@Injectable({
	providedIn: 'root',
})
export class LoginMapper implements TMapperToDto<LoginDto, Login> {

	/** @inheritdoc */
	public toDto(data: Login): LoginDto {
		return {
			email: data.email,
			password: data.password,
		};
	}
}
