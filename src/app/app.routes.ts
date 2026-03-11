import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Cities } from './features/public/cities/cities';
import { Laws } from './features/public/laws/laws';
import { Status } from './features/public/status/status';
import { Projects } from './features/public/projects/projects';
import { Overview } from './features/dashboard/overview/overview';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cities', component: Cities },
  { path: 'laws', component: Laws },
  { path: 'status', component: Status },
  { path: 'projects', component: Projects },
  { path: 'dashboard', component: Overview },
];
