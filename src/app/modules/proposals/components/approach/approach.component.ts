import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { SectionMeta } from '../../../../shared/components/section-meta/section-meta';

@Component({
  selector: 'app-approach',
  imports: [SectionMeta],
  templateUrl: './approach.component.html',
  styleUrl: './approach.component.scss',
})
export class ApproachComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
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
