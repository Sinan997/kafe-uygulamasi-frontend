import { AbstractControl, ValidationErrors } from '@angular/forms';

export function editPasswordValidator(
  isPasswordEditable: boolean,
): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return isPasswordEditable ? null : { required: true };
  };
}
