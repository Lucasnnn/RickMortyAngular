import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  selected = new FormControl('home');

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.events.subscribe(() => {
      this.setButtonSelected();
    });

    this.selected.valueChanges.pipe(debounceTime(100)).subscribe((route) => {
      if (route) {
        this._router.navigateByUrl(route);
      }
    });
  }

  setButtonSelected(): void {
    const url = this._router?.url?.replace('/', '');

    if (url) {
      this.selected.setValue(url);
    } else {
      this.selected.setValue('home');
    }
  }
}
