import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export default class CustomValidators {
  static Password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value;
      let errors: ValidationErrors = {};

      const hasNumber = /[0-9]+/.test(controlValue);
      const hasLowerCase = /[a-z]+/.test(controlValue);
      const hasUpperCase = /[A-Z]+/.test(controlValue);
      const isValid = hasNumber && hasLowerCase && hasUpperCase;

      if (!hasNumber) {
        errors = {...errors, noNumber: true};
      }
      if (!hasLowerCase) {
        errors = {...errors, noLowerCase: true};
      }
      if (!hasUpperCase) {
        errors = {...errors, noUpperCase: true};
      }
      return isValid ? null : errors;
    };
  }

  static ValuesMatch(fieldName: string, matchFieldName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fieldControl = group.get(fieldName);
      const matchFieldControl = group.get(matchFieldName);
      if (fieldControl?.value !== matchFieldControl?.value) {
        const notMatchError = {notMatch: true};
        matchFieldControl?.setErrors(notMatchError);
        return notMatchError;
      }
      return null;
    };
  }
}
