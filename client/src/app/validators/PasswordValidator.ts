import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

interface ValidationDefinition {
  regexp: RegExp;
  errorKey: string;
}

export default class PasswordValidator {
  private static errorMessages = {
    required: 'Password field is required!',
    minlength: 'Minimum length of password is 12 letters!',
    maxlength: 'Maximum length of password is 30 letters!',
    noUpperCase: 'Password must contain at least one capital letter!',
    noLowerCase: 'Password must contain at least one lowercase letter!',
    noNumber: 'Password must contain at least one number!',
    noSpecialChar: 'Password must contain at least one special character!'
  };

  public static getErrorMessage(error: ValidationErrors): string | null {
    const errorKey = Object.keys(error)[0] as keyof typeof PasswordValidator.errorMessages;
    if(!(errorKey in this.errorMessages)) {
      return null;
    }
    return PasswordValidator.errorMessages[errorKey];
  }

  private static validationDefinitions: ValidationDefinition[] = [
    {regexp: /[0-9]+/, errorKey: 'noNumber'},
    {regexp: /[a-z]+/, errorKey: 'noLowerCase'},
    {regexp: /[A-Z]+/, errorKey: 'noUpperCase'},
    {regexp: /[^A-Za-z0-9]/, errorKey: 'noSpecialChar'}
  ];

  static validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value;
      let errors: ValidationErrors = {};

      this.validationDefinitions.forEach(validationDefinition => {
        if (!validationDefinition.regexp.test(controlValue)) {
          errors = {...errors, [validationDefinition.errorKey]: true};
        }
      });

      return errors ?? null;
    };
  }

  static valuesMatch(fieldName: string, matchFieldName: string): ValidatorFn {
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
