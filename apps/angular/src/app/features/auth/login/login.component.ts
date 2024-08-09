import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '@js-camp/angular/core/models/login';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

/** Login component. */
@Component({
	selector: 'camp-login',
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	/** Login form. */
	protected readonly loginForm = LoginForm.initialize(this.fb);

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
