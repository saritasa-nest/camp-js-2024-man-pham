import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';
import { RegisterForm } from '@js-camp/angular/core/models/register';

/** Register component. */
@Component({
	selector: 'camp-register',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
	private readonly fb = inject(NonNullableFormBuilder);

	/** Register form group. */
	protected readonly registerForm = RegisterForm.initialize(this.fb);
}
