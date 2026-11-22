import { Component, input } from '@angular/core';
import { PlanCard } from '../../../../shared/components/plan-card/plan-card';
import { SectionMeta } from '../../../../shared/components/section-meta/section-meta';
import { IProposalPlan } from '../../interfaces/proposal.interfaces';

@Component({
  selector: 'app-investment',
  imports: [PlanCard, SectionMeta],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss',
})
export class InvestmentComponent {
  readonly plans = input.required<readonly IProposalPlan[]>();
}
