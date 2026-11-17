import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-meta',
  templateUrl: './section-meta.html',
  styleUrl: './section-meta.scss',
})
export class SectionMeta {
  readonly number = input.required<string>();
  readonly label = input.required<string>();
}
