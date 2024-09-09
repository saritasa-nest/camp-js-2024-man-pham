import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const SNACKBAR_OPTIONS = {
	action: 'Close',
	duration: 5,
};

const DEFAULT_MILLISECOND = 1000;

/** Notification service. */
@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	private readonly snackBar = inject(MatSnackBar);

	/**
	 * Displays a notification bar.
	 * @param message The message to be displayed in the notification bar.
	 */
	public showMessage(message: string): void {
		this.snackBar.open(message, SNACKBAR_OPTIONS.action, {
			duration: SNACKBAR_OPTIONS.duration * DEFAULT_MILLISECOND,
			verticalPosition: 'top',
		});
	}
}
