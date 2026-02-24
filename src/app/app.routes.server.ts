import { Component } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { AboutSection } from './core/layout/about-section/about-section';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
