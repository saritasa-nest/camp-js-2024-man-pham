import { Injectable } from '@angular/core';

import { TMapper } from '../models/mapper';

/** Date mapper service. */
@Injectable({
	providedIn: 'root',
})
export class DateTimeMapper implements TMapper<string, Date> {

	private parseDate(dateStr: string): Date {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) {
			throw new Error(`Invalid date format: ${dateStr}`);
		}
		return date;
	}

	/**
	 * @inheritdoc
	 * Return either a valid date or an empty date.
	 */
	public fromDto(dto: string): Date {
		try {
			return this.parseDate(dto);
		} catch (error) {
			if (error instanceof Error) {
				console.error('Date parsing error:', error.message);
			} else {
				console.error('Unexpected error:', error);
			}
			throw error;
		}
	}

	/** @inheritdoc */
	public toDto(model: Date): string {
		return model.toISOString();
	}
}
