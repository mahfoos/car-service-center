import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <select (change)="switchLang($event)">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="si">සිංහල</option>
    </select>
  `,
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) {}

  switchLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
  }
}
