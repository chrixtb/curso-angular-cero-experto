import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils { 
    
    static isValidField(formGroup: FormGroup, fieldName: string): boolean | null {
        return !!formGroup.controls[fieldName].errors && formGroup.controls[fieldName].touched;
    }

    static getFieldError(formGroup: FormGroup, fieldName: string): string | null {
        if (!formGroup.controls[fieldName].errors) return null;

        const errors = formGroup.controls[fieldName].errors ?? {};
        return FormUtils.getErrorMessage(errors);
    }

    static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
        return (formArray.controls[index].errors && formArray.controls[index].touched);
    }

    static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
        if (!formArray.controls[index].errors) return null;

        const errors = formArray.controls[index].errors ?? {};
        return FormUtils.getErrorMessage(errors);
    }

    static getErrorMessage(errors: ValidationErrors): string | null {
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