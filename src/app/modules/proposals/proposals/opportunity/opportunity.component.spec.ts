import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { OpportunityComponent } from './opportunity.component';

describe('OpportunityComponent', () => {
  let component: OpportunityComponent;
  let fixture: ComponentFixture<OpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunityComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: Meta, useValue: { updateTag: jasmine.createSpy('updateTag') } },
        { provide: Title, useValue: { setTitle: jasmine.createSpy('setTitle') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the opportunity page', () => {
    expect(component).toBeTruthy();
  });
});
