import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { AboutSection } from "../../layout/about-section/about-section";

@Component({
  selector: 'app-home-page',
  imports: [Header, AboutSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}
