import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApproachComponent } from './approach.component';

describe('ApproachComponent', () => {
  let fixture: ComponentFixture<ApproachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproachComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ApproachComponent);
  });

  it('updates the timeline progress and markers as the viewport reaches each step', () => {
    const page = fixture.nativeElement as HTMLElement;
    const steps = page.querySelectorAll<HTMLElement>('.timeline-item');
    const markers = page.querySelectorAll<HTMLElement>('.timeline-marker');
    let top = window.innerHeight;

    steps.forEach((step) => {
      spyOn(step, 'getBoundingClientRect').and.callFake(() => new DOMRect(0, top, 100, 200));
    });
    markers.forEach((marker) => {
      spyOn(marker, 'getBoundingClientRect').and.callFake(() => new DOMRect(0, top, 34, 34));
    });
    fixture.detectChanges();

    expect(steps[0].style.getPropertyValue('--line-progress')).toBe('0.000');
    expect(markers[0].classList.contains('is-reached')).toBeFalse();

    const animationFrame = spyOn(window, 'requestAnimationFrame').and.returnValue(42);
    top = -200;
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));

    expect(animationFrame).toHaveBeenCalledTimes(1);
    animationFrame.calls.mostRecent().args[0](0);

    expect(steps[0].style.getPropertyValue('--line-progress')).toBe('1.000');
    expect(steps[1].style.getPropertyValue('--line-progress')).toBe('1.000');
    expect(markers[0].classList.contains('is-reached')).toBeTrue();
    expect(markers[2].classList.contains('is-reached')).toBeTrue();
  });

  it('removes viewport listeners and cancels pending animation when destroyed', () => {
    const addListener = spyOn(window, 'addEventListener').and.callThrough();
    const removeListener = spyOn(window, 'removeEventListener').and.callThrough();
    fixture.detectChanges();

    const animationFrame = spyOn(window, 'requestAnimationFrame').and.returnValue(42);
    const cancelFrame = spyOn(window, 'cancelAnimationFrame');
    window.dispatchEvent(new Event('scroll'));
    const scrollListener = addListener.calls.allArgs().find(([event]) => event === 'scroll')![1];
    const resizeListener = addListener.calls.allArgs().find(([event]) => event === 'resize')![1];
    fixture.destroy();

    expect(removeListener).toHaveBeenCalledWith('scroll', scrollListener);
    expect(removeListener).toHaveBeenCalledWith('resize', resizeListener);
    expect(cancelFrame).toHaveBeenCalledWith(42);

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
    expect(animationFrame).toHaveBeenCalledTimes(1);
  });
});
