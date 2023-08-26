import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export default class MatchValidator {
  public static valuesMatch(fieldName: string, matchFieldName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const fieldControl: AbstractControl | null = group.get(fieldName);
      const matchFieldControl: AbstractControl | null = group.get(matchFieldName);
      if (fieldControl?.value !== matchFieldControl?.value) {
        const notMatchError: {} = {notMatch: true};
        matchFieldControl?.setErrors(notMatchError);
        return notMatchError;
      }
      return null;
    };
  }
}
