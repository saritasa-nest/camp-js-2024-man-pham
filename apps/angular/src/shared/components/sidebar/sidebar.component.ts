import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

/** Sidebar. */
@Component({
	selector: 'camp-sidebar',
	standalone: true,
	imports: [MatSidenavModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
