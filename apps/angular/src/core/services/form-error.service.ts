import { Injectable } from '@angular/core';

import { FormGroup, AbstractControl } from '@angular/forms';

const ERROR_MESSAGES: Record<string, string> = {
	default: 'Something went wrong. Please try again later.',
	required: 'This field is required.',
	email: 'Enter a valid email address.',
	minlength: `Below the minimum length required for this field.`,
	maxlength: `Exceeds the maximum length of this field.`,
	mustMatch: 'Password does not match.',
};

/** Form error service. */
@Injectable({
	providedIn: 'root',
})
export class FormErrorService {

	private getErrorMessage(errorKey: string): string {
		return ERROR_MESSAGES[errorKey] || errorKey;
	}

	private findFieldControl(form: FormGroup, fieldName: string): AbstractControl | null {
		let control = form.get(fieldName);
		if (!control) {
			Object.keys(form.controls).forEach(key => {
				const groupControl = form.get(key);
				if (groupControl instanceof FormGroup) {
					const nestedControl = this.findFieldControl(groupControl, fieldName);
					if (nestedControl) {
						control = nestedControl;
					}
				}
			});
		}
		return control;
	}

	/**
	 * Get the errors of the control.
	 * @param control Form control.
	 */
	public getErrors(control: AbstractControl): string {
		const errors = { ...control.errors, ...control.parent?.errors };
		if (!errors) {
			return '';
		}

		return Object.keys(errors)
			.map(errorKey => this.getErrorMessage(errorKey))
			.join(' ');
	}

	/**
	 * Clears errors for a specific field or the entire form.
	 * @param form Form group.
	 * @param fieldName Specific field name.
	 */
	public clearErrors(form: FormGroup, fieldName?: string): void {
		if (fieldName) {
			const control = this.findFieldControl(form, fieldName);
			if (control) {
				control.setErrors(null);
			}
		} else {
			form.updateValueAndValidity();
		}
	}
}
