import { inject, Injectable } from '@angular/core';

import { FormGroup, AbstractControl } from '@angular/forms';
import { ApiErrorResponse, ApiErrorResponseWithDetails } from '@js-camp/core/models/api-error-response';

import { NotificationService } from './notification.service';

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
	private readonly notificationService = inject(NotificationService);

	/**
	 * Handle displaying the errors that are from the server.
	 * @param form The form.
	 * @param error The error response.
	 */
	public handleResponseError(form: FormGroup, error: unknown): void {
		if (error instanceof ApiErrorResponseWithDetails) {
			this.displayResponseError(form, error);
		}
	}

	private displayResponseError(form: FormGroup, apiErrorResponse: ApiErrorResponse): void {
		if (apiErrorResponse.errors.length === 0) {
			this.notificationService.showMessage(ERROR_MESSAGES['default']);
			return;
		}
		apiErrorResponse.errors.forEach(error => {
			const fieldName = error.attr;
			const message = error.detail;

			if (!fieldName) {
				this.notificationService.showMessage(message ?? ERROR_MESSAGES['default']);
				return;
			}
			if (form == null || !this.hasFieldName(form, fieldName)) {
				this.notificationService.showMessage(`Error: ${fieldName} ${message}`);
			} else {
				this.setFieldError(form, fieldName, message);
			}
		});
	}

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

	private setFieldError(form: FormGroup, fieldName: string, message: string): void {
		const control = this.findFieldControl(form, fieldName);
		const errors = { ...control?.errors, [message]: true };
		control?.setErrors(errors);
	}

	private hasFieldName(form: FormGroup, fieldName: string): boolean {
		const control = this.findFieldControl(form, fieldName);
		return control != null;
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
