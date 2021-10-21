import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export default class CustomValidators {
  private static passwordErrorMessages = {
    required: 'Password field is required!',
    minlength: 'Minimum length of password is 5 letters!',
    maxlength: 'Maximum length of password is 30 letters!',
    noUpperCase: 'Password must contain at least one capital letter!',
    noLowerCase: 'Password must contain at least one lowercase letter!',
    noNumber: 'Password must contain at least one number!',
    noSpecialChar: 'Password must contain at least one special character!'
  };

  static getPasswordErrorMessage(error: ValidationErrors): string | null {
    const errorKey = Object.keys(error)[0] as keyof typeof CustomValidators.passwordErrorMessages;
    if (!(errorKey in this.passwordErrorMessages)) {
      return null;
    }
    return CustomValidators.passwordErrorMessages[errorKey];
  }

  static Password(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value;
      let errors: ValidationErrors = {};

      const hasNumber = /[0-9]+/.test(controlValue);
      const hasLowerCase = /[a-z]+/.test(controlValue);
      const hasUpperCase = /[A-Z]+/.test(controlValue);
      const hasSpecialChar = /[^A-Za-z0-9]/.test(controlValue);

      const isValid = hasNumber && hasLowerCase && hasUpperCase && hasSpecialChar;

      if (!hasUpperCase) {
        errors = {...errors, noUpperCase: true};
      }
      if (!hasLowerCase) {
        errors = {...errors, noLowerCase: true};
      }
      if (!hasNumber) {
        errors = {...errors, noNumber: true};
      }
      if (!hasSpecialChar) {
        errors = {...errors, noSpecialChar: true};
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
