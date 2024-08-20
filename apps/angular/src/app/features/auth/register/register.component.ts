import { ChangeDetectionStrategy, Component, DestroyRef, inject } from "@angular/core";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { InputPasswordComponent } from "@js-camp/angular/shared/components/input-password/input-password.component";
import { FormErrorService } from "@js-camp/angular/core/services/form-error.service";
import { BehaviorSubject, catchError, finalize } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { Register } from "@js-camp/core/models/register";
import { UserService } from "@js-camp/angular/core/services/user.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ApiErrorResponseWithDetails } from "@js-camp/core/models/api-error-response";
import { mustMatch } from "@js-camp/angular/app/shared/validators/must-match";

/** Register form type. */
type RegisterForm = {

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

namespace RegisterForm {

	/**
	 * Initializes register form.
	 * @param fb Non nullable form builder.
	 */
	export function initialize(fb: NonNullableFormBuilder): FormGroup<RegisterForm> {
		const passwordControl = fb.control("", [Validators.required]);
		const confirmPasswordControl = fb.control("", [Validators.required, mustMatch(passwordControl)]);

		passwordControl.valueChanges.subscribe(() => {
			confirmPasswordControl.updateValueAndValidity();
		});

		return fb.group({
			email: fb.control("", [Validators.required, Validators.email]),
			firstName: fb.control("", [Validators.required]),
			lastName: fb.control("", [Validators.required]),
			password: passwordControl,
			confirmPassword: confirmPasswordControl,
		});
	}
}

/** Register component. */
@Component({
	selector: "camp-register",
	standalone: true,
	imports: [
		AsyncPipe,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		RouterLink,
		InputPasswordComponent,
	],
	templateUrl: "./register.component.html",
	styleUrls: ["../auth.component.css", "./register.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	private readonly userService = inject(UserService);

	private readonly router = inject(Router);

	/** Register form group. */
	protected readonly registerForm = RegisterForm.initialize(this.fb);

	/** Form error service. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Loading state. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Submit handler. */
	protected onSubmit(): void {
		this.registerForm.markAllAsTouched();

		if (this.registerForm.invalid) {
			return;
		}
		this.isLoading$.next(true);
		const registerData = new Register(this.registerForm.getRawValue());
		this.userService
			.register(registerData)
			.pipe(
				catchError((error: unknown) => {
					if (error instanceof ApiErrorResponseWithDetails) {
						this.formErrorService.displayResponseError(this.registerForm, error);
					}
					throw Error;
				}),
				finalize(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe(() => this.router.navigate(["/"], { replaceUrl: true }));
	}
}
