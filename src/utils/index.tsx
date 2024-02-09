import {PossibleRuleType, RuleType} from '../types';

export const isNumeric = (arg: any): boolean => {
  return !isNaN(arg) && !isNaN(parseFloat(arg));
};

export const checkValidationRules = (validationRules: Array<RuleType>) => {
  let checkPassed = true;

  //  checking rules array length
  if (validationRules.length > 0) {
    //  checking ruleValue in MIN_LENGTH and MAX_LENGTH
    validationRules.every(rule => {
      //  checking key validity
      if (
        [
          'MIN_LENGTH',
          'MAX_LENGTH',
          'SPECIAL_CHARS',
          'NUMERIC',
          'UPPERCASE_LETTER',
          'LOWERCASE_LETTER',
          'PASSWORDS_MATCH',
        ].includes(rule.key)
      ) {
        switch (rule.key) {
          case 'MIN_LENGTH':
          case 'MAX_LENGTH':
            if (isNumeric(rule.ruleValue)) {
              return true; //  continue loop in `every`
            } else {
              checkPassed = false;
              console.error(`Add a valid numeric ruleValue for ${rule.key}`);
              return false; //  stop loop in `every`
            }

          default:
            return true; //  continue loop in `every`
        }
      } else {
        console.error(`Invalid rule key is added: ${rule.key}`);
      }
    });
  } else {
    console.error('Expecting at least one validation rule');
  }

  return checkPassed;
};

export const getDefaultRuleLabel = (
  ruleKey: PossibleRuleType,
  ruleValue: number,
): string => {
  switch (ruleKey) {
    case 'MIN_LENGTH':
      return `Password contains more than ${ruleValue} characters`;
    case 'MAX_LENGTH':
      return `Password does not contain more than ${ruleValue} characters`;
    case 'UPPERCASE_LETTER':
      return 'Password contains at least one uppercase letter';
    case 'LOWERCASE_LETTER':
      return 'Password contains at least one lowercase letter';
    case 'NUMERIC':
      return 'Password contains at least one numeric';
    case 'SPECIAL_CHARS':
      return 'Password contains at least one special character';
    case 'PASSWORDS_MATCH':
      return 'Entered passwords are matching';
  }
};

export const getValidation = (
  rule: RuleType,
  newPassword: string,
  confirmPassword: string,
): boolean => {
  switch (rule.key) {
    case 'MIN_LENGTH':
      return newPassword.length >= rule.ruleValue;
    case 'MAX_LENGTH':
      return newPassword.length > 0 && newPassword.length <= rule.ruleValue;
    case 'LOWERCASE_LETTER':
      return /[a-z]/.test(newPassword);
    case 'UPPERCASE_LETTER':
      return /[A-Z]/.test(newPassword);
    case 'NUMERIC':
      return /\d/.test(newPassword);
    case 'SPECIAL_CHARS':
      return /[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/.test(newPassword);
    case 'PASSWORDS_MATCH':
      return newPassword.trim().length > 0 && newPassword === confirmPassword;
  }
};

export function debounce(func: Function, timeout = 300) {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
