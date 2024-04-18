import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import { CharacterService } from 'src/app/core/services/character.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _character: CharacterService) {}

  inputSearch = new FormControl();

  ngOnInit(): void {
    this._character.characters$.subscribe((characters) => {
      console.log(characters);
    });

    this.inputSearch.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value) {
        this._character.filterCharacters(value).subscribe();
      }
    });
  }
}
