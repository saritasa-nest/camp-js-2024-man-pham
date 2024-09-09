import { Injectable } from '@angular/core';
import { LoginDto } from '@js-camp/core/dtos/login.dto';
import { Login } from '@js-camp/core/models/login';
import { TMapperToDto } from '@js-camp/core/models/mapper';

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
