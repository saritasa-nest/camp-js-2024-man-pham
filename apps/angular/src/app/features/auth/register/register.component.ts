import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterForm } from '@js-camp/angular/core/models/register-form';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { InputPasswordComponent } from '@js-camp/angular/shared/components/input-password/input-password.component';

/** Register component. */
@Component({
	selector: 'camp-register',
	standalone: true,
	imports: [
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

	/** Register form group. */
	protected readonly registerForm = RegisterForm.initialize(this.fb);
}
