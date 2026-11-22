import { Component, inject } from '@angular/core';
import { PageMetaService } from '../../../shared/services/page-meta.service';
import { photography } from './photography.data';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss',
})
export class PhotographyComponent {
  readonly content = photography;

  constructor() {
    inject(PageMetaService).update(
      'BTP | Bianca Tem Um Plano',
      'Bianca tem um plano - Fotografia de Casamento, Ensaios e Eventos Sociais.',
      '/',
    );
  }

  scrollCatalog(catalog: HTMLElement, direction: number): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    catalog.scrollBy({ left: direction * 288, behavior: reducedMotion ? 'instant' : 'smooth' });
  }
}
