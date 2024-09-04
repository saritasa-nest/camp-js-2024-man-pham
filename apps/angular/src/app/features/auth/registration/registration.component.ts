import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mustMatch } from '@js-camp/angular/app/shared/validators/must-match';
import { PasswordInputComponent } from '@js-camp/angular/shared/components/password-input/password-input.component';
import { Registration } from '@js-camp/core/models/registration';

/** Register form type. */
type RegistrationForm = {

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

/** Register component. */
@Component({
	selector: 'camp-registration',
	standalone: true,
	imports: [
		AsyncPipe,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		RouterLink,
		PasswordInputComponent,
	],
	templateUrl: './registration.component.html',
	styleUrls: ['../auth.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	/** Register form group. */
	protected readonly registrationForm: FormGroup<RegistrationForm>;

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	public constructor() {
		this.registrationForm = this.initializeForm();
	}

	/** Submit handler. */
	protected onSubmit(): void {
		this.registrationForm.markAllAsTouched();

		if (this.registrationForm.invalid) {
			return;
		}
		this.isLoading$.next(true);
		const registrationData = new Registration(this.registrationForm.getRawValue());
		this.userService
			.register(registrationData)
			.pipe(
				catchError((error: unknown) => {
					this.formErrorService.handleResponseError(this.registrationForm, error);
					throw Error;
				}),
				finalize(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => this.router.navigate(['/'], { replaceUrl: true }));
	}

	private initializeForm(): FormGroup<RegistrationForm> {
		const passwordControl = this.fb.control('', [Validators.required]);
		const confirmPasswordControl = this.fb.control('', [Validators.required, mustMatch(passwordControl)]);

		passwordControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			confirmPasswordControl.updateValueAndValidity();
		});

		return this.fb.group({
			email: this.fb.control('', [Validators.required, Validators.email]),
			firstName: this.fb.control('', [Validators.required]),
			lastName: this.fb.control('', [Validators.required]),
			password: passwordControl,
			confirmPassword: confirmPasswordControl,
		});
	}
}
