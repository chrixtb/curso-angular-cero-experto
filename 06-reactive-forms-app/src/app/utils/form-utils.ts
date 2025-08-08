import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormUtils { 
    // Expresiones regulares
    static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

    
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
                case 'email':
                    return `El valor ingresado no es un correo electrónico`;
                case 'pattern':
                    if( errors['pattern'].requiredPatter === FormUtils.emailPattern) {
                        return 'El valor ingresado no es un correo electrónico válido';
                    }
                    return 'Error de patrón contra expresión regular';
                default:
                    return `Error de validacion no controlado: ${key}`;
            }
        }
        return null;
    }

    static isFieldOneEqualFieldTwo(field1: string, field2: string): ValidatorFn {
        return (formGroup : AbstractControl): ValidationErrors | null => {
            const field1Value = formGroup.get(field1)?.value;
            const field2Value = formGroup.get(field2)?.value;
            
            return field1Value === field2Value ? null : { 'fieldsMismatch': true };
        }
    }
}