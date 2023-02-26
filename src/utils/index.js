import {VALIDATION_RULES_KEYS} from '../';
export const isNumeric = arg => {
  return !isNaN(arg) && !isNaN(parseFloat(arg));
};

export const checkValidationRules = validationRules => {
  let checkPassed = true;

  //  checking rules array length
  if (validationRules.length > 0) {
    //  checking ruleValue in MIN_LENGTH and MAX_LENGTH
    validationRules.every(rule => {
      //  checking key validity
      if (Object.values(VALIDATION_RULES_KEYS).includes(rule.key)) {
        switch (rule.key) {
          case VALIDATION_RULES_KEYS.MIN_LENGTH:
          case VALIDATION_RULES_KEYS.MAX_LENGTH:
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

export const getDefaultRuleLabel = (ruleKey, ruleValue) => {
  switch (ruleKey) {
    case VALIDATION_RULES_KEYS.MIN_LENGTH:
      return `Password contains more than ${ruleValue} characters`;
    case VALIDATION_RULES_KEYS.MAX_LENGTH:
      return `Password does not contain more than ${ruleValue} characters`;
    case VALIDATION_RULES_KEYS.UPPERCASE_LETTER:
      return 'Password contains at least one uppercase letter';
    case VALIDATION_RULES_KEYS.LOWERCASE_LETTER:
      return 'Password contains at least one lowercase letter';
    case VALIDATION_RULES_KEYS.NUMERIC:
      return 'Password contains at least one numeric';
    case VALIDATION_RULES_KEYS.SPECIAL_CHARS:
      return 'Password contains at least one special character';
    case VALIDATION_RULES_KEYS.PASSWORDS_MATCH:
      return 'Entered passwords are matching';
  }
};

export const getValidation = (rule, newPassword, confirmPassword) => {
  switch (rule.key) {
    case VALIDATION_RULES_KEYS.MIN_LENGTH:
      return newPassword.length >= rule.ruleValue;
    case VALIDATION_RULES_KEYS.MAX_LENGTH:
      return newPassword.length > 0 && newPassword.length <= rule.ruleValue;
    case VALIDATION_RULES_KEYS.LOWERCASE_LETTER:
      return /[a-z]/.test(newPassword);
    case VALIDATION_RULES_KEYS.UPPERCASE_LETTER:
      return /[A-Z]/.test(newPassword);
    case VALIDATION_RULES_KEYS.NUMERIC:
      return /\d/.test(newPassword);
    case VALIDATION_RULES_KEYS.SPECIAL_CHARS:
      return /[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/.test(newPassword);
    case VALIDATION_RULES_KEYS.PASSWORDS_MATCH:
      return newPassword.trim().length > 0 && newPassword === confirmPassword;
  }
};

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
