import { FormUtils } from './../../../utils/form-utils';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required,  Validators.pattern(FormUtils.emailPattern)], FormUtils.checkingServerResponse],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },
  {
    validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  onSubmit() {
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
      return;
    }

    console.log('Formulario enviado correctamente', this.myForm.value);
    this.myForm.reset();
  }

  passwordsMatchValidator(): ValidatorFn {
    return (group : AbstractControl): ValidationErrors | null => {
      const passwordControl = group.get('password');
      const password2Control = group.get('password2');

      // Si no existen los controles, o sus valores no son válidos, no hacemos nada.
      // Esto evita errores de "null" y permite que otros validadores actúen primero.
      if (!passwordControl || !password2Control || passwordControl.pristine || password2Control.pristine) {
        return null;
      }

      // Compara los valores
      if (passwordControl.value !== password2Control.value) {
      // Si no coinciden, devuelve un error
        return { 'passwordMismatch': true };
      }

      // Si coinciden, devuelve null (sin errores)
      return null;
    }
  }

}
