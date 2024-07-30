import { Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';

/** Date mapper service. */
@Injectable({
	providedIn: 'root',
})
export class DateMapperService implements TMapper<string | null, Date | null> {

	public constructor() { }

	/** @inheritdoc */
	public fromDto(dto: string | null): Date | null {
		return dto ? new Date(dto) : null;
	}

	/** @inheritdoc */
	public toDto(model: Date | null): string | null {
		return model ? model.toISOString() : null;
	}
}
