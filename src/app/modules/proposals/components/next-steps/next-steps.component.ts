import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowIcon } from '../../../../shared/components/arrow-icon/arrow-icon';
import { SectionMeta } from '../../../../shared/components/section-meta/section-meta';

@Component({
  selector: 'app-next-steps',
  imports: [ArrowIcon, RouterLink, SectionMeta],
  templateUrl: './next-steps.component.html',
  styleUrl: './next-steps.component.scss',
})
export class NextStepsComponent {
  readonly proposalName = input.required<string>();
}
