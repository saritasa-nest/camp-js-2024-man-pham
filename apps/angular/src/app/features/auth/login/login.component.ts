import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';
import { LoginForm } from '@js-camp/angular/core/models/login';

/** Login component. */
@Component({
	selector: 'camp-login',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	/** Login form. */
	protected readonly loginForm = LoginForm.initialize(this.fb);
}
