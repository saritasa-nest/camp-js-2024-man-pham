import { Injectable } from '@angular/core';
import { ApiErrorResponseDto } from '@js-camp/core/dtos/api-error-response.dto';
import { TMapperFromDto } from '@js-camp/core/models/mapper';

import { ApiError } from '@js-camp/core/models/api-error';
import { ApiErrorResponse } from '@js-camp/core/models/api-error-response';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again later.';

const AUTH_ERROR_CODES = ['no_active_account'];
const AUTH_ERROR_ATTRS = ['email', 'password', 'first_name', 'last_name', 'avatar'];

/** Api response mapper. */
@Injectable({ providedIn: 'root' })
export class ApiErrorResponseMapper implements TMapperFromDto<ApiErrorResponseDto, ApiErrorResponse> {

	/** @inheritdoc */
	public fromDto(dto: ApiErrorResponseDto): ApiErrorResponse {
		return new ApiErrorResponse({
			errors: dto.errors.map(error => {
				let detail = DEFAULT_ERROR_MESSAGE;

				if (AUTH_ERROR_CODES.includes(error.code) || AUTH_ERROR_ATTRS.includes(error.attr ?? '')) {
					detail = error.detail ?? DEFAULT_ERROR_MESSAGE;
				}
				return new ApiError({
					detail,
					attr: error.attr,
				});
			}),
		});
	}
}
