import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageURISource,
  Text,
  View,
  TextStyle,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {
  checkValidationRules,
  debounce,
  getDefaultRuleLabel,
  getValidation,
} from './utils';
import {RuleType} from './types';

type Props = {
  newPassword: string;
  confirmPassword: string;
  onPasswordValidateChange: (data: boolean) => void;
  validationRules: Array<RuleType>;
  iconSuccessSource?: ImageURISource;
  iconErrorSource?: ImageURISource;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  iconStyle?: ImageStyle;
};

type CustomRuleType = RuleType & {validation: boolean; label: string};

const PasswordValidate: React.FC<Props> = ({
  newPassword,
  confirmPassword,
  onPasswordValidateChange,
  validationRules,
  iconSuccessSource = require('./assets/success/success.png'),
  iconErrorSource = require('./assets/error/error.png'),
  containerStyle = {},
  labelStyle = {},
  iconStyle = {},
}) => {
  const [rulesList, setRulesList] = useState<Array<CustomRuleType>>([]);

  const validatePasswords = (list: Array<CustomRuleType>) => {
    //  check if any field is false
    const allSuccess =
      list.some(object => object.validation === false) === false;

    onPasswordValidateChange(allSuccess);
  };

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
    const list: Array<CustomRuleType> = [];

    validationRules.forEach(rule => {
      const object = {
        ...rule,
        validation: getValidation(rule, newPassword, confirmPassword),
        label: rule.label || getDefaultRuleLabel(rule.key, rule.ruleValue || 0),
      };

      list.push(object);
    });

    setRulesList(list);

    debounceValidationCheckFunc(list);
  };

  const renderItem = ({item}: {item: CustomRuleType}) => (
    <View style={styles.field}>
      {item.validation ? (
        <Image style={[styles.icon, iconStyle]} source={iconSuccessSource} />
      ) : (
        <Image style={[styles.icon, iconStyle]} source={iconErrorSource} />
      )}

      <Text style={[styles.label, labelStyle]}>{item.label}</Text>
    </View>
  );

  const keyExtractor = (item: any, index: number) => `${index}`;

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

export default PasswordValidate;
