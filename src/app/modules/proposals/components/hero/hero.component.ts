import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowIcon } from '../../../../shared/components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-hero',
  imports: [ArrowIcon, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly proposalName = input.required<string>();
}
