import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '@js-camp/angular/core/models/register-form';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

/** Register component. */
@Component({
	selector: 'camp-register',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	/** Register form group. */
	protected readonly registerForm = RegisterForm.initialize(this.fb);

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	/**
	 * Handles hide password button click.
	 * @param event The click event.
	 *  */
	protected clickHidePassword(event: MouseEvent): void {
		this.hidePassword.set(!this.hidePassword());
		event.stopPropagation();
	}
}
