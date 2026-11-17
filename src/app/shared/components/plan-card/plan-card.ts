import { Component, computed, input } from '@angular/core';

export interface ProposalPlan {
  id: string;
  name: string;
  price: string;
  delivery: string;
  photoCount: number;
  stars: number;
  features: readonly string[];
  featured?: boolean;
}

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.html',
  styleUrl: './plan-card.scss',
})
export class PlanCard {
  readonly plan = input.required<ProposalPlan>();

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
