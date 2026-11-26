import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-zone" aria-live="polite">
      @if (ui.toast(); as msg) {
        <div class="toast">{{ msg }}</div>
      }
    </div>
  `,
  styles: `
    .toast-zone { position: fixed; z-index: 90; top: calc(var(--header-h) + 12px); left: 0; right: 0;
                  display: flex; justify-content: center; pointer-events: none; }
    .toast { padding: .7rem 1.2rem; background: var(--blue); color: var(--on-hi); border: 0; border-radius: 999px;
             box-shadow: var(--glow-blue); font-weight: 800; animation: toast-in .3s var(--ease) both; }
    @keyframes toast-in { from { opacity: 0; transform: translateY(-14px) scale(.95); } }
  `,
})
export class Toast {
  protected readonly ui = inject(UiService);
}
