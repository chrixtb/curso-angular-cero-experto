import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
        ['Metal Gear Solid', Validators.required],
        ['The Legend of Zelda', Validators.required],
      ], 
      Validators.minLength(2)
    ),
  });

  newFavorte = new FormControl('', [Validators.required]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavorite() {
    if (this.newFavorte.invalid) return;
    
    const newGame = this.newFavorte.value;
    this.favoriteGames.push(this.fb.control(newGame, [Validators.required]));

    this.newFavorte.reset();
  }

  onRemoveFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    console.log('Form submitted:', this.myForm.value);

    // if (this.myForm.invalid) return;

    this.myForm.markAllAsTouched();

    // this.myForm.reset();
    // this.favoriteGames.clear();
  }
}
