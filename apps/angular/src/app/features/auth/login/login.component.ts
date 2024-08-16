import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { LoginForm } from '@js-camp/angular/core/models/login-form';
import { Login } from '@js-camp/core/models/login';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';

import { BehaviorSubject, catchError, finalize } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AsyncPipe } from '@angular/common';

import { ApiErrorResponseWithDetails } from '@js-camp/core/models/api-error-response';
import { InputPasswordComponent } from '@js-camp/angular/shared/components/input-password/input-password.component';

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
	styleUrl: './login.component.css',
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
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

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
