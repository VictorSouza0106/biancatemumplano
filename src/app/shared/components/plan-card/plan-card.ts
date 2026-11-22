import { Component, computed, input } from '@angular/core';
import { IProposalPlan } from 'src/app/modules/proposals/interfaces/proposal.interfaces';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.scss',
})
export class PlanCard {
  readonly plan = input.required<IProposalPlan>();

  readonly whatsappUrl = computed(() => {
    const plan = this.plan();
    const message = [
      `Escolhi meu pacote! Quero o plano *${plan.name}* 📸`,
      '',
      'Detalhes:',
      `*Investimento:* ${plan.price}`,
      `*Prazo de entrega:* ${plan.delivery}`,
      `*Quantidade de fotos:* Até ${plan.photoCount} fotos`,
    ].join('\n');

    return `https://api.whatsapp.com/send?phone=5519997810267&text=${encodeURIComponent(message)}`;
  });
}
