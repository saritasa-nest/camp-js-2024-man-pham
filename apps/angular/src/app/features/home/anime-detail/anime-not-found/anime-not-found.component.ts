import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

/** Anime not found component. */
@Component({
	selector: 'camp-anime-not-found',
	standalone: true,
	imports: [MatIcon, RouterLink],
	templateUrl: './anime-not-found.component.html',
	styleUrl: './anime-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeNotFoundComponent {}
