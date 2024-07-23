import { Pipe, PipeTransform } from '@angular/core';

const DEFAULT_VALUE = '-';

/** A custom pipe to transform an empty string to a default value. */
@Pipe({
	name: 'noEmptyString',
	standalone: true,
})
export class NoEmptyStringPipe implements PipeTransform {
	/**
	 * Transform an empty string to a given default value.
	 * @param value The given string.
	 * @returns Return the given string or a default value if the string is empty.
	 */
	public transform(value: string | null): string {
		return (value && value.length > 0) ? value : DEFAULT_VALUE;
	}
}
