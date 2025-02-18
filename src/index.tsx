import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageURISource,
  Text,
  View,
  TextStyle,
  ImageStyle,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import {
  checkValidationRules,
  debounce,
  getDefaultRuleLabel,
  getValidation,
} from "./utils";
import { RuleType } from "./types";

type Props = {
  newPassword: string;
  confirmPassword?: string;
  onPasswordValidateChange: (data: boolean) => void;
  validationRules: Array<RuleType>;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  isImage?: boolean;
  imageSource?: {
    success: ImageURISource;
    error: ImageURISource;
  };
  labelStyle?: {
    success?: TextStyle;
    error?: TextStyle;
  };
  iconComponent?: {
    success: React.ReactNode;
    error: React.ReactNode;
  };
};

type CustomRuleType = RuleType & {validation: boolean};

const PasswordValidate: React.FC<Props> = ({
  newPassword,
  confirmPassword = "",
  onPasswordValidateChange,
  validationRules,
  imageSource = {
    success: require('./assets/success/success.png'),
    error: require('./assets/error/error.png'),
  },
  containerStyle = {},
  labelStyle = {},
  imageStyle = {},
  isImage = true,
  iconComponent,
}) => {
  const [rulesList, setRulesList] = useState<Array<CustomRuleType>>([]);

  const validatePasswords = (list: Array<CustomRuleType>) => {
    //  check if any field is false
    const allSuccess =
      list.some((object) => object.validation === false) === false;

    onPasswordValidateChange(allSuccess);
  };

  const debounceValidationCheckFunc = useCallback(
    debounce(validatePasswords),
    []
  );

  useEffect(() => {
    if (checkValidationRules(validationRules)) {
      setFieldsList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, confirmPassword, validationRules]);

  const setFieldsList = () => {
    const list: Array<CustomRuleType> = [];

    validationRules.forEach((rule) => {
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

  const renderItem = ({ item }: { item: CustomRuleType }) => (
    <View style={styles.field}>
      {item.validation ? (
        <>
          {isImage ? (
            <Image
              style={[styles.icon, imageStyle]}
              source={imageSource.success}
            />
          ) : (
            iconComponent?.success
          )}
          <Text style={[styles.label, labelStyle.success]}>{item.label}</Text>
        </>
      ) : (
        <>
          {isImage ? (
            <Image
              style={[styles.icon, imageStyle]}
              source={imageSource.error}
            />
          ) : (
            iconComponent?.error
          )}
          <Text style={[styles.label, labelStyle.error]}>{item.label}</Text>
        </>
      )}
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
