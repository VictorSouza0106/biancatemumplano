import { Component } from '@angular/core';
import { AboutSection } from "../../layout/about-section/about-section";

@Component({
  selector: 'app-home-page',
  imports: [AboutSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
