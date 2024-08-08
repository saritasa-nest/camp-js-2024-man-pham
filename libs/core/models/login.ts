import { FormControl, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';

/** Login form type. */
export type LoginForm = {

	/** Email form field. */
	readonly email: FormControl<string>;

	/** Password form field. */
	readonly password: FormControl<string>;
};

export namespace LoginForm {

	/**
	 * Initializes a login form using FormBuilder.
	 * @param fb Form builder object.
	 */
	export function initialize(fb: NonNullableFormBuilder): FormGroup<LoginForm> {
		return fb.group({
			email: fb.control('', [Validators.required, Validators.email]),
			password: fb.control('', [Validators.required]),
		});
	}
}
