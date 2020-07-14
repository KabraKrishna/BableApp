import { AbstractControl, ValidatorFn } from '@angular/forms';

export function promoCodeValidator(promocode: string): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if(control.value === promocode){
          return { 'promoCodeValidation': true };
        }
        return null;
      };
}