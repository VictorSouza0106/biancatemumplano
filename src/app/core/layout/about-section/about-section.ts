import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { Calendar } from 'src/app/shared/component/calendar/calendar';

@Component({
  selector: 'app-about-section',
  imports: [Calendar],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
})
export class AboutSection implements OnInit {
  ngOnInit(): void {
    this.initTitleAnimation();
    console.log('AboutSection');
  }

  private initTitleAnimation(): void {
    let timeline = gsap.timeline();

    timeline.fromTo(
      '.big-title',
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0% 50%)',
        y: -50,
      },
      {
        duration: 1.2,
        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)',
        y: 0,
      },
    );

    timeline.fromTo(
      '.anim-sup',
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0% 50%)',
        y: -35,
      },
      {
        duration: 1.2,
        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 70%)',
        y: -85,
      },
      '<',
    );

    timeline.fromTo(
      '.tiny-title',
      {
        y: 120,
        opacity: 0,
      },
      {
        duration: 0.3,
        opacity: 1,
        y: 0,
      },
      '>',
    );
  }
}
