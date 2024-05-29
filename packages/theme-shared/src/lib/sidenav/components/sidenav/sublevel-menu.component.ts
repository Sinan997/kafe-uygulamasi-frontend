import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { INavbarData, fadeInOut } from './helper';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    @if (collapsed() && data().items && data().items!.length > 0) {
      <ul
        [@submenu]="
          expanded()
            ? {
                value: 'visible',
                params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*' }
              }
            : {
                value: 'hidden',
                params: { transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0' }
              }
        "
        class="sublevel-nav"
      >
        @for (item of data().items; track $index) {
          <li class="sublevel-nav-item">
            @if (item.items && item.items.length > 0) {
              <a
                class="sublevel-nav-link"
                (click)="handleClick(item)"
                [ngClass]="getActiveClass(item)"
              >
                <i class="sublevel-link-icon fa fa-circle"></i>
                @if (collapsed()) {
                  <span class="sublevel-link-text" @fadeInOut>{{ item.label | translate }}</span>
                }
                @if (item.items && collapsed()) {
                  <i
                    class="menu-collapse-icon"
                    [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"
                  ></i>
                }
              </a>
            }
            @if (!item.items || (item.items && item.items.length === 0)) {
              <a
                class="sublevel-nav-link"
                [routerLink]="[item.routeLink]"
                routerLinkActive="active-sublevel"
                [routerLinkActiveOptions]="{ exact: true }"
                (click)="isNavigated.emit()"
              >
                <i class="sublevel-link-icon fa fa-circle"></i>
                @if (collapsed()) {
                  <span class="sublevel-link-text" @fadeInOut>{{ item.label | translate }}</span>
                }
              </a>
            }
            @if (item.items && item.items.length > 0) {
              <app-sublevel-menu
                style="cursor: pointer;"
                [data]="item"
                [collapsed]="collapsed()"
                [expanded]="item.expanded"
              ></app-sublevel-menu>
            }
          </li>
        }
      </ul>
    }
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        }),
      ),
      state(
        'visible',
        style({
          height: '*',
        }),
      ),
      transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParams}}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
  standalone: true,
  imports: [TranslateModule, NgClass, RouterLinkActive, RouterLink],
})
export class SublevelMenuComponent {
  protected readonly router = inject(Router);

  readonly collapsed = input(false);
  readonly data = input<INavbarData>({ routeLink: '', label: '' });
  readonly expanded = input<boolean | undefined>();
  readonly isNavigated = output();

  handleClick(item: any): void {
    if (this.data().items && this.data().items!.length > 0) {
      for (let modelItem of this.data().items!) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routeLink) ? 'active-sublevel' : '';
  }
}
