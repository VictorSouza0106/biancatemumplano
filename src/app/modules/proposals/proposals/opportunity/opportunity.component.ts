import { Component } from "@angular/core";
import { EventTemplateComponent } from "../../templates/event-template/event-template.component";
import { IProposal, IProposalPlan } from "../../interfaces/proposal.interfaces";

@Component({
  selector: 'app-proposal-opportunity',
  imports: [EventTemplateComponent],
  templateUrl: './opportunity.component.html',
  styleUrl: './opportunity.component.scss',
})
export class OpportunityComponent {

  plans: IProposalPlan[] = [
    {
      id: 'plan-premium',
      name: 'Premium',
      price: 'R$ 759,90',
      delivery: '2 a 3 dias úteis',
      photoCount: 300,
      stars: 3,
      features: [
        'Fotos editadas com prioridade.',
        'Registros personalizados com ângulos estratégicos.',
        'Equipamento profissional.',
        'Cobertura completa do evento.',
        'Chegada antecipada para registrar a preparação.',
        '2 vídeos mobile editados.',
        'Entrega em 2 a 3 dias úteis.',
      ],
    },
    {
      id: 'plan-essencial',
      name: 'Essencial',
      price: 'R$ 499,90',
      delivery: 'até 10 dias úteis',
      photoCount: 150,
      stars: 1,
      features: [
        'Fotos entregues em pastas com prioridade.',
        'Equipamento de alta qualidade.',
        'Entrega em até 10 dias úteis.',
      ],
    },
    {
      id: 'plan-classico',
      name: 'Clássico',
      price: 'R$ 559,90',
      delivery: '4 a 5 dias úteis',
      photoCount: 200,
      stars: 2,
      featured: true,
      features: [
        'Fotos entregues em pastas com prioridade.',
        'Equipamento de alta qualidade.',
        'Cobertura completa do evento.',
        'Entrega em 4 a 5 dias úteis.',
      ],
    },
  ];

  protected proposal: IProposal = {
    name: 'Opportunity',
    plans: this.plans
  }
}
