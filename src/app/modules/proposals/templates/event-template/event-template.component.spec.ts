import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { IProposalPlan } from '../../interfaces/proposal.interfaces';
import { EventTemplateComponent } from './event-template.component';

describe('EventTemplateComponent', () => {
  let component: EventTemplateComponent;
  let fixture: ComponentFixture<EventTemplateComponent>;
  const plans: IProposalPlan[] = [
    {
      id: 'plan-essencial',
      name: 'Essencial',
      price: 'R$ 499,90',
      delivery: 'até 10 dias úteis',
      photoCount: 150,
      stars: 1,
      features: ['Equipamento de alta qualidade.'],
    },
    {
      id: 'plan-classico',
      name: 'Clássico',
      price: 'R$ 559,90',
      delivery: '4 a 5 dias úteis',
      photoCount: 200,
      stars: 2,
      featured: true,
      features: ['Cobertura completa do evento.'],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventTemplateComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: Meta, useValue: { updateTag: jasmine.createSpy('updateTag') } },
        { provide: Title, useValue: { setTitle: jasmine.createSpy('setTitle') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventTemplateComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('contentData', { name: 'Evento', plans });
    fixture.detectChanges();
  });

  it('creates the event template page', () => {
    expect(component).toBeTruthy();
  });

  it('keeps each navigation link connected to its page section', () => {
    const page = fixture.nativeElement as HTMLElement;
    const links = page.querySelectorAll<HTMLAnchorElement>('a[href*="#"]');

    expect(links.length).toBe(4);
    links.forEach((link) => {
      const targetId = new URL(link.href).hash.slice(1);
      expect(page.querySelector(`[id="${targetId}"]`)).withContext(link.textContent ?? '').not.toBeNull();
    });
  });

  it('renders the proposal plans with their WhatsApp selection details', () => {
    const page = fixture.nativeElement as HTMLElement;
    const cards = page.querySelectorAll<HTMLElement>('.plan-card');

    expect(cards.length).toBe(plans.length);
    plans.forEach((plan, index) => {
      const card = cards[index];
      const selection = card.querySelector<HTMLAnchorElement>('.plan-button');
      const message = new URL(selection!.href).searchParams.get('text');

      expect(card.textContent).toContain(plan.name);
      expect(card.textContent).toContain(plan.price);
      expect(message).toContain(plan.name);
      expect(message).toContain(plan.price);
      expect(message).toContain(plan.delivery);
      expect(message).toContain(`${plan.photoCount} fotos`);
      expect(card.classList.contains('plan-card--featured')).toBe(!!plan.featured);
    });
  });
});
