import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { first } from 'rxjs';

/** Authentication navigator. */
@Component({
	selector: 'camp-auth-navigator',
	standalone: true,
	imports: [MatButtonModule, AsyncPipe, RouterLink, TitleCasePipe],
	templateUrl: './auth-navigator.component.html',
	styleUrl: './auth-navigator.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNavigatorComponent {
	private readonly userService = inject(UserService);

	/** Currently logged in user. */
	protected readonly currentUser$ = this.userService.currentUser$;

	/** Logs the user out. */
	protected handleClickLogoutButton(): void {
		this.userService.logout().pipe(first())
			.subscribe();
	}
}
