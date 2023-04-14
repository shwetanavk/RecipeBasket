import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() featureSelect = new EventEmitter<string>();
  collapsed = true;

  onSelect(feature: string) {
    this.featureSelect.emit(feature);
  }
}
