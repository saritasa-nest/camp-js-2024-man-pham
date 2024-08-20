import { Injectable } from '@angular/core';
import { TMapper } from '@js-camp/core/models/mapper';

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
		return this.parseDate(dto);
	}

	/** @inheritdoc */
	public toDto(model: Date): string {
		return model.toISOString();
	}
}
