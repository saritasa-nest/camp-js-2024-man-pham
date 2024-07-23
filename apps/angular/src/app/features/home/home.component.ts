import { Component } from '@angular/core';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Example component. */
@Component({
	selector: 'camp-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	imports: [AnimeTableComponent],
	standalone: true,
})
export class HomeComponent {}
