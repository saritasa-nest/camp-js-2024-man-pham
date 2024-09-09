import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom form validator to check if control values match.
 * @param matchingControl The control to match against.
 */
export function mustMatch(matchingControl: AbstractControl): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null =>
		control.value !== matchingControl.value ? { mustMatch: true } : null;
}
