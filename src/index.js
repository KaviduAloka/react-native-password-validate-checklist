import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';

import styles from './styles';
import {
  checkValidationRules,
  debounce,
  getDefaultRuleLabel,
  getValidation,
} from './utils';

const VALIDATION_RULES_KEYS = {
  MIN_LENGTH: 'MIN_LENGTH',
  MAX_LENGTH: 'MAX_LENGTH',
  SPECIAL_CHARS: 'SPECIAL_CHARS',
  NUMERIC: 'NUMERIC',
  UPPERCASE_LETTER: 'UPPERCASE_LETTER',
  LOWERCASE_LETTER: 'LOWERCASE_LETTER',
  PASSWORDS_MATCH: 'PASSWORDS_MATCH',
};

const PasswordValidate = ({
  newPassword,
  confirmPassword,
  onPasswordValidateChange,
  validationRules,
  iconSuccessSource,
  iconErrorSource,
  containerStyle,
  labelStyle,
  iconStyle,
}) => {
  const [rulesList, setRulesList] = useState([]);

  const validatePasswords = list => {
    //  check if any field is false
    const allSuccess =
      list.some(object => object.validation === false) === false;

    onPasswordValidateChange(allSuccess);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValidationCheckFunc = useCallback(
    debounce(validatePasswords),
    [],
  );

  useEffect(() => {
    if (checkValidationRules(validationRules)) {
      setFieldsList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, confirmPassword, validationRules]);

  const setFieldsList = () => {
    const list = [];

    validationRules.forEach(rule => {
      const object = {
        ...rule,
        validation: getValidation(rule, newPassword, confirmPassword),
        label: rule.label || getDefaultRuleLabel(rule.key, rule.ruleValue),
      };

      list.push(object);
    });

    setRulesList(list);

    debounceValidationCheckFunc(list);
  };

  const renderItem = ({item}) => (
    <View style={styles.field}>
      {item.validation ? (
        <Image style={[styles.icon, iconStyle]} source={iconSuccessSource} />
      ) : (
        <Image style={[styles.icon, iconStyle]} source={iconErrorSource} />
      )}

      <Text style={[styles.label, labelStyle]}>{item.label}</Text>
    </View>
  );

  const keyExtractor = (item, index) => `${index}`;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <FlatList
        data={rulesList}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

PasswordValidate.propTypes = {
  newPassword: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onPasswordValidateChange: PropTypes.func.isRequired,
  validationRules: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      ruleValue: PropTypes.any,
    }),
  ).isRequired,

  containerStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconSuccessSource: PropTypes.any,
  iconErrorSource: PropTypes.any,
};

PasswordValidate.defaultProps = {
  containerStyle: {},
  labelStyle: {},
  iconStyle: {},
  iconSuccessSource: require('./assets/success/success.png'),
  iconErrorSource: require('./assets/error/error.png'),
};

export {VALIDATION_RULES_KEYS};

export default PasswordValidate;
