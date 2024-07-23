import { Pipe, PipeTransform } from '@angular/core';

const NULL_VALUE = '-';

/** A custom pipe to transform an empty string to a default value. */
@Pipe({
	name: 'noEmpty',
	standalone: true,
})
export class NoEmptyPipe implements PipeTransform {
	/**
	 * Transform an empty value to a given default value.
	 * @param value The given value.
	 * @returns Return the given value or a default value if the value is empty.
	 */
	public transform(value: string | number | null): string | number {
		return value != null && (value !== '' || typeof value === 'number' && !isNaN(value)) ? value : NULL_VALUE;
	}
}
