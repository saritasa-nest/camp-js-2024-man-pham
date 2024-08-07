import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'camp-anime-not-found',
	standalone: true,
	imports: [MatIconModule],
	templateUrl: './anime-not-found.component.html',
	styleUrl: './anime-not-found.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeNotFoundComponent {}
