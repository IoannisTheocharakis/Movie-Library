import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'collections',
        loadChildren: () =>
          import('./features/collections/collections.module').then(
            (m) => m.CollectionsModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
