import { Component, effect, input, inject } from "@angular/core";
import { Title, Meta } from "@angular/platform-browser";
import { ApproachComponent } from "../../components/approach/approach.component";
import { CareComponent } from "../../components/care/care.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { IntroComponent } from "../../components/intro/intro.component";
import { InvestmentComponent } from "../../components/investment/investment.component";
import { NavigationComponent } from "../../components/navigation/navigation.component";
import { NextStepsComponent } from "../../components/next-steps/next-steps.component";
import { StatementComponent } from "../../components/statement/statement.component";
import { IProposal } from "../../interfaces/proposal.interfaces";

@Component({
  selector: 'app-event-template',
  imports: [
    HeaderComponent,
    HeroComponent,
    IntroComponent,
    ApproachComponent,
    StatementComponent,
    InvestmentComponent,
    CareComponent,
    NextStepsComponent,
    FooterComponent,
    NavigationComponent,
  ],
  templateUrl: './event-template.component.html',
  styleUrl: './event-template.component.scss',
})
export class EventTemplateComponent {

  // Inputs & Outputs
  readonly contentData = input.required<IProposal>();

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.title.setTitle('Sua experiência | BTP Fotografia');
    effect(() => {
      this.meta.updateTag({
        name: 'description',
        content: `Proposta de fotografia para ${this.contentData().name}, por BTP Fotografia.`,
      });
    });
  }
}
