import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CanvasComponent } from './canvas/canvas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'canvas', component: CanvasComponent },
  // Add more routes here as needed
];
