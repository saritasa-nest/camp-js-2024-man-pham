import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Input,
	signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';

/** Input with password type. */
@Component({
	selector: 'camp-input-password',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './input-password.component.html',
	styleUrl: './input-password.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent {

	/** Password form control. */
	@Input()
	public control = new FormControl();

	/** Input placeholder. */
	@Input()
	public placeholder = 'Enter your password';

	/** Form error. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	/**
	 * Handles hide password button click.
	 * @param event The click event.
	 *  */
	protected clickHidePassword(event: MouseEvent): void {
		this.hidePassword.update(prev => !prev);
		event.stopPropagation();
	}
}
