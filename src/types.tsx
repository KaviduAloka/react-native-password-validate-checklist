export type PossibleRuleType =
  | 'MIN_LENGTH'
  | 'MAX_LENGTH'
  | 'SPECIAL_CHARS'
  | 'NUMERIC'
  | 'UPPERCASE_LETTER'
  | 'LOWERCASE_LETTER'
  | 'PASSWORDS_MATCH';

export type RuleType = {
  key: PossibleRuleType;
  label?: string;
  ruleValue?: number;
};
