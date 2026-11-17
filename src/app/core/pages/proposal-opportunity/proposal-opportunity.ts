import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ArrowIcon } from '../../../shared/components/arrow-icon/arrow-icon';
import { PlanCard, ProposalPlan } from '../../../shared/components/plan-card/plan-card';
import { SectionMeta } from '../../../shared/components/section-meta/section-meta';

@Component({
  selector: 'app-proposal-opportunity',
  imports: [ArrowIcon, PlanCard, RouterLink, SectionMeta],
  templateUrl: './proposal-opportunity.html',
  styleUrl: './proposal-opportunity.scss',
})
export class ProposalOpportunity {
  readonly plans: readonly ProposalPlan[] = [
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

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.title.setTitle('Sua experiência | BTP Fotografia');
    this.meta.updateTag({
      name: 'description',
      content: 'Proposta de fotografia para Opportunity, por BTP Fotografia.',
    });

    afterNextRender(() => this.initTimeline());
  }

  private initTimeline(): void {
    const steps = this.host.nativeElement.querySelectorAll<HTMLElement>(
      '.timeline-item:not(:last-child)',
    );
    const markers = this.host.nativeElement.querySelectorAll<HTMLElement>('.timeline-marker');
    if (!steps.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const revealY = window.innerHeight * 0.65;

      steps.forEach((step) => {
        const rect = step.getBoundingClientRect();
        const lineStart = rect.top + 52;
        const lineLength = Math.max(rect.height - 34, 1);
        const progress = Math.max(0, Math.min(1, (revealY - lineStart) / lineLength));
        step.style.setProperty('--line-progress', progress.toFixed(3));
      });

      markers.forEach((marker) => {
        const rect = marker.getBoundingClientRect();
        marker.classList.toggle('is-reached', rect.top + rect.height / 2 <= revealY);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    });
  }
}
