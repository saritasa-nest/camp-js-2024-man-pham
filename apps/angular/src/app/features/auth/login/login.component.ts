import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Login } from '@js-camp/core/models/login';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';

import { BehaviorSubject, catchError, finalize } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AsyncPipe } from '@angular/common';

import { InputPasswordComponent } from '@js-camp/angular/shared/components/input-password/input-password.component';
import { ApiErrorResponseWithDetails } from '@js-camp/core/models/api-error-response';

/** Login form type. */
type LoginForm = {

	/** Email form field. */
	readonly email: FormControl<string>;

	/** Password form field. */
	readonly password: FormControl<string>;
};

namespace LoginForm {

	/**
	 * Initializes a login form using FormBuilder.
	 * @param fb Form builder object.
	 */
	export function initialize(fb: NonNullableFormBuilder): FormGroup<LoginForm> {
		return fb.group({
			email: fb.control('', { validators: [Validators.required, Validators.email] }),
			password: fb.control('', { validators: [Validators.required, Validators.minLength(8)] }),
		});
	}
}

/** Login component. */
@Component({
	selector: 'camp-login',
	standalone: true,
	imports: [
		AsyncPipe,
		InputPasswordComponent,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		RouterLink,
	],
	templateUrl: './login.component.html',
	styleUrls: ['../auth.component.css', './login.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Login form. */
	protected readonly loginForm = LoginForm.initialize(this.fb);

	/** Submit handler. */
	protected onSubmit(): void {
		this.loginForm.markAllAsTouched();

		if (this.loginForm.invalid) {
			return;
		}
		this.isLoading$.next(true);
		const loginData = new Login(this.loginForm.getRawValue());
		this.userService
			.login(loginData)
			.pipe(
				catchError((error: unknown) => {
					if (error instanceof ApiErrorResponseWithDetails) {
						this.formErrorService.displayResponseError(this.loginForm, error);
					}
					throw Error;
				}),
				finalize(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => this.router.navigate(['/'], { replaceUrl: true }));
	}
}
