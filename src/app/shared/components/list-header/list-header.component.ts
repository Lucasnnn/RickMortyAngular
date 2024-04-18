import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
})
export class ListHeaderComponent {
  @Input() title: string;
}
