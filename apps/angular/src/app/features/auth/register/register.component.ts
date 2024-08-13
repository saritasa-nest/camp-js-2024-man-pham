import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '@js-camp/angular/core/models/register-form';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InputPasswordComponent } from '@js-camp/angular/shared/components/input-password/input-password.component';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { BehaviorSubject, catchError, finalize } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Register } from '@js-camp/core/models/register';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Register component. */
@Component({
	selector: 'camp-register',
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
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
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
	protected readonly isLoading$ = new BehaviorSubject<boolean>(false);

	/** Submit handler. */
	protected onSubmit(): void {
		if (this.registerForm.invalid) {
			return;
		}
		this.isLoading$.next(true);
		const registerData = new Register(this.registerForm.getRawValue());
		this.userService
			.register(registerData)
			.pipe(
				catchError((_error: unknown) => {
					throw Error;
				}),
				finalize(() => {
					this.isLoading$.next(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => this.router.navigate(['/']));
	}
}
