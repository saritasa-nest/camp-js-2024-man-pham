import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DestroyRef,
	inject,
	Input,
	signal,
	OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormErrorService } from '@js-camp/angular/core/services/form-error.service';
import { tap } from 'rxjs';

/** Input with password type. */
@Component({
	selector: 'camp-password-input',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
	templateUrl: './password-input.component.html',
	styleUrl: './password-input.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent implements OnInit {
	/** Password form control. */
	@Input()
	public control = new FormControl();

	/** Input touched status. */
	@Input()
	public touched = false;

	/** Input placeholder. */
	@Input()
	public placeholder = 'Enter your password';

	/** Input id. */
	@Input()
	public id = '';

	/** Form error. */
	protected readonly formErrorService = inject(FormErrorService);

	/** Hide password flag. */
	protected readonly hidePassword = signal(true);

	private readonly changeDetector = inject(ChangeDetectorRef);

	private readonly destroyRef = inject(DestroyRef);

	/** Side effect to ensure checking the input when its status changed. */
	public ngOnInit(): void {
		this.control.statusChanges
			.pipe(
				tap(() => {
					this.changeDetector.markForCheck();
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	/**
	 * Handles hide password button click.
	 * @param event The click event.
	 *  */
	protected handleClickHidePasswordButton(event: MouseEvent): void {
		this.hidePassword.update(prev => !prev);
		event.stopPropagation();
	}
}
