import { FormGroup, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';

/** Register form type. */
export type RegisterForm = {

	/** Email field. */
	readonly email: FormControl<string>;

	/** First name field. */
	readonly firstName: FormControl<string>;

	/** Last name field. */
	readonly lastName: FormControl<string>;

	/** Password field. */
	readonly password: FormControl<string>;

	/** Confirm password field. */
	readonly confirmPassword: FormControl<string>;
};

export namespace RegisterForm {

	/**
	 * Initializes register form.
	 * @param fb Non nullable form builder.
	 */
	export function initialize(fb: NonNullableFormBuilder): FormGroup<RegisterForm> {
		return fb.group({
			email: fb.control('', [
				Validators.required,
				Validators.email,
			]),
			firstName: fb.control('', [Validators.required]),
			lastName: fb.control('', [Validators.required]),
			password: fb.control('', [Validators.required]),
			confirmPassword: fb.control('', [Validators.required]),
		});
	}
}
