import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

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
    formUtils = FormUtils

    myForm : FormGroup = this.fb.group({
        // ['Valor por defecto', validadores sincronos , Validadores asincronos ]
        name: ['', [Validators.required, Validators.minLength(3)], /** Validadores asincronos*/ ],
        price: [0, [Validators.required, Validators.min(10)],],
        inStorage: [0, [Validators.required, Validators.min(0)],],
    });
    
    onSubmit() {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();
            return;
        }

        console.log('Formulario enviado correctamente', this.myForm.value);
        this.myForm.reset();
    }

}
