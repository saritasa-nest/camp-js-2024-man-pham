import { Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';

/** Date mapper service. */
@Injectable({
	providedIn: 'root',
})
export class DateTimeMapper implements TMapper<string, Date> {

	private parseDate(dateStr: string): Date | null {
		const date = new Date(dateStr);
		return isNaN(date.getTime()) ? null : date;
	}

	/**
	 * @inheritdoc
	 * Return either a valid date or an empty date.
	 */
	public fromDto(dto: string): Date {
		const date = this.parseDate(dto);
		return date ?? new Date('');
	}

	/** @inheritdoc */
	public toDto(model: Date): string {
		return model.toISOString();
	}
}
