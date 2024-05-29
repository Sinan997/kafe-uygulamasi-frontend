import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  inject,
  computed,
  Signal,
  output,
  signal,
} from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { SidenavService } from '../../services';
import { TranslateModule } from '@ngx-translate/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ]),
        ),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SublevelMenuComponent,
    TranslateModule,
    NgClass,
    NgIf,
    NgFor,
  ],
})
export class SidenavComponent implements OnInit {
  protected readonly sidenavService = inject(SidenavService);
  protected readonly router = inject(Router);


  readonly onToggleSideNav = output<SideNavToggle>();
  readonly onLogout = output();
  collapsed = signal(false);
  screenWidth = signal(0);
  navData: Signal<INavbarData[]>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() <= 768) {
      this.collapsed.set(false);
      this.onToggleSideNav.emit({ collapsed: this.collapsed(), screenWidth: this.screenWidth() });
    }
  }

  ngOnInit(): void {
    this.screenWidth.set(window.innerWidth);
    this.navData = computed(() => this.sidenavService.navdata());
  }

  toggleCollapse(): void {
    this.collapsed.update((val) => !val);
    this.onToggleSideNav.emit({ collapsed: this.collapsed(), screenWidth: this.screenWidth() });
  }

  handleClick(item: INavbarData): void {
    item.expanded = !item.expanded;

    if (item.items?.length && !this.collapsed) {
      this.toggleCollapse();
      item.expanded = true;
    }
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.split('/')[1] === data.routeLink ? 'active' : '';
  }

  logout() {
    this.onLogout.emit();
  }
}
