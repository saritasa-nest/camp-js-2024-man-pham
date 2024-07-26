import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { Observable } from 'rxjs';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';

@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [CommonModule, AnimeTableComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCatalogComponent {
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.animeService.getAnime();
	}

}
