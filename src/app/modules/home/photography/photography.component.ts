import { Component } from '@angular/core';
import { photography } from './photography.data';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss',
})
export class PhotographyComponent {
  readonly content = photography;

  scrollCatalog(catalog: HTMLElement, direction: number): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    catalog.scrollBy({ left: direction * 288, behavior: reducedMotion ? 'instant' : 'smooth' });
  }
}
