import { animate, style, transition, trigger } from "@angular/animations";

export interface INavbarData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[];
}

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('350ms',
        style({opacity: 0})
      )
    ])
  ])

  export const submenuAnimation = trigger('submenu', [
    transition(':enter', [
      style({ opacity: 0, height: '0' }),
      animate('400ms cubic-bezier(0.86, 0, 0.07, 1)', style({ opacity: 1, height: '*' }))
    ]),
    transition(':leave', [
      animate('400ms cubic-bezier(0.86, 0, 0.07, 1)', style({ opacity: 0, height: '0' }))
    ])
  ]);
