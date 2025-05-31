import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent { 
    // myForm = new FormGroup({
    //     name: new FormControl(''),
    //     price: new FormControl(0),
    //     inStorage: new FormControl(0),
    // });

    // Inicializar usando FormBuilder.
    private fb = inject(FormBuilder);

    myForm : FormGroup = this.fb.group({
        // ['Valor por defecto', validadores sincronos , Validadores asincronos ]
        name: ['', [Validators.required, Validators.minLength(3)], /** Validadores asincronos*/ ],
        price: [0, [Validators.required, Validators.min(10)],],
        inStorage: [0, [Validators.required, Validators.min(10)],],
    });

    isValidField(fieldName: string) : boolean | null {
        return !!this.myForm.controls[fieldName].errors //&& this.myForm.controls[fieldName].touched;
    }

    getFieldError(fieldName: string) : string | null {
        if( !this.myForm.controls[fieldName].errors) return null;

        const errors = this.myForm.controls[fieldName].errors ?? {};

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `El valor mínimo es ${errors['min'].min}`;
            }
        }
        return null;
    }
    
}
