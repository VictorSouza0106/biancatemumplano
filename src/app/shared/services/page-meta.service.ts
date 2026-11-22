import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

const SITE_URL = 'https://www.biancatemumplano.com.br';
const SHARE_IMAGE_URL = `${SITE_URL}/photography/bianca-compartilhamento-1200x430.jpg`;
const SHARE_IMAGE_ALT = 'Bianca sorrindo e segurando uma câmera fotográfica';

@Injectable({ providedIn: 'root' })
export class PageMetaService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  update(title: string, description: string, path: string): void {
    const url = new URL(path.split(/[?#]/)[0], SITE_URL).href;

    this.title.setTitle(title);

    const tags: MetaDefinition[] = [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pt_BR' },
      { property: 'og:site_name', content: 'Bianca Tem Um Plano' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: SHARE_IMAGE_URL },
      { property: 'og:image:secure_url', content: SHARE_IMAGE_URL },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '430' },
      { property: 'og:image:alt', content: SHARE_IMAGE_ALT },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: SHARE_IMAGE_URL },
      { name: 'twitter:image:alt', content: SHARE_IMAGE_ALT },
    ];

    tags.forEach((tag) => this.meta.updateTag(tag));
  }
}
