import { Component, computed, input } from '@angular/core';

type ArrowDirection = 'down-right' | 'up' | 'up-right';

const arrowPaths: Record<ArrowDirection, string> = {
  'down-right': 'M5 5l14 14M19 8v11H8',
  up: 'M12 19V5M5 12l7-7 7 7',
  'up-right': 'M5 19 19 5M8 5h11v11',
};

@Component({
  selector: 'app-arrow-icon',
  templateUrl: './arrow-icon.html',
  styleUrl: './arrow-icon.scss',
})
export class ArrowIcon {
  readonly direction = input.required<ArrowDirection>();
  readonly path = computed(() => arrowPaths[this.direction()]);
}
