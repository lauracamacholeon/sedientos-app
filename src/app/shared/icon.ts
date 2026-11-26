import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'whatsapp' | 'cart' | 'close' | 'plus' | 'minus' | 'arrow' | 'instagram'
  | 'clock' | 'pin' | 'bike' | 'bag' | 'search' | 'trash' | 'check' | 'menu' | 'card';

/** Íconos SVG simples. Uso: <app-icon name="whatsapp" /> */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
         stroke-linecap="round" stroke-linejoin="round">
      @switch (name()) {
        @case ('whatsapp') {
          <path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/>
        }
        @case ('cart') {
          <path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/>
        }
        @case ('bag') {
          <path d="M5 8h14l-1.2 12H6.2L5 8Z"/><path d="M9 11V6a3 3 0 0 1 6 0v5"/>
        }
        @case ('close') { <path d="M6 6l12 12M18 6 6 18"/> }
        @case ('plus') { <path d="M12 5v14M5 12h14"/> }
        @case ('minus') { <path d="M5 12h14"/> }
        @case ('arrow') { <path d="M5 12h14M13 6l6 6-6 6"/> }
        @case ('check') { <path d="m5 12 5 5 9-10"/> }
        @case ('menu') { <path d="M4 7h16M4 12h16M4 17h16"/> }
        @case ('search') { <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/> }
        @case ('trash') { <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/> }
        @case ('instagram') {
          <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        }
        @case ('clock') { <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/> }
        @case ('pin') { <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/> }
        @case ('bike') {
          <circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/>
          <path d="M6 17h5l3-6h4M14 11 12 7H9M18 17l-3-6"/>
        }
        @case ('card') { <rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h4"/> }
      }
    </svg>
  `,
  styles: `
    :host { display: inline-flex; width: 1.25em; height: 1.25em; flex: none; }
    svg { width: 100%; height: 100%; }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
