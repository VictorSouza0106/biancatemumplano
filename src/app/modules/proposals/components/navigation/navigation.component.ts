import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowIcon } from '../../../../shared/components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-navigation',
  imports: [ArrowIcon, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly proposalName = input.required<string>();
}
