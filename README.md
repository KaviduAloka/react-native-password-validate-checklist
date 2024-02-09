# react-native-password-validate-checklist

A customizable component which can add rules to a password and show the status of each validation.

## Example

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/31509440/220936959-3800bf38-e446-4b51-bb21-d83e88168e30.gif)

<br />

## Installation

`yarn add react-native-password-validate-checklist`
<br /><br />
`npm install react-native-password-validate-checklist`
<br />

## Usage

```
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import PasswordValidate from 'react-native-password-validation-checklist';

const Test: React.FC = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validated, setValidated] = useState(false);

  return (
    <View>
      <TextInput
        onChangeText={text => setPassword1(text)}
      />
      <TextInput
        onChangeText={text => setPassword2(text)}
      />

      <PasswordValidate
        newPassword={password1}
        confirmPassword={password2}
        validationRules={[
          {
            key: 'MIN_LENGTH',
            ruleValue: 9,
            label: 'Should contain more than 9 characters',
          },
          {
            key: 'MAX_LENGTH',
            ruleValue: 15,
            label: 'අක්ෂර 15 කට වඩා තිබිය නොහැක',
          },
          {key: 'LOWERCASE_LETTER'},
          {key: 'UPPERCASE_LETTER'},
          {key: 'NUMERIC'},
          {key: 'PASSWORDS_MATCH'},
          {key: 'SPECIAL_CHARS'},
        ]}
        onPasswordValidateChange={validatedBoolean =>
          setValidated(validatedBoolean)
        }
      />

      <Text>
        {validated ? 'PASSWORD VALIDATED' : 'NOT VALID PASSWORD'}
      </Text>
    </View>
  );
};

export default Test;
```

This library is capable of customizing validation labels as well. This is helpful for multiple languages supported applications

## Possible validation rules

#### MIN_LENGTH

Set a minimum characters validation check

```
{
  key: "MIN_LENGTH",
  ruleValue: 10,  //  required
  label: "Minimum characters count is 10"
}
```

| Key       | Type    | Description                                                                      |
| --------- | ------- | -------------------------------------------------------------------------------- |
| ruleValue | Numeric | -                                                                                |
| label     | String  | Optional. (Default value: "Password contains more than ${ruleValue} characters") |

---

#### MAX_LENGTH

Set a maximum characters validation check

```
{
  key: "MAX_LENGTH",
  ruleValue: 15,  //  required
  label: "Maximum characters count is 15"
}
```

| Key       | Type    | Description                                                                              |
| --------- | ------- | ---------------------------------------------------------------------------------------- |
| ruleValue | Numeric | -                                                                                        |
| label     | String  | Optional. (Default value: "Password does not contain more than ${ruleValue} characters") |

---

#### UPPERCASE_LETTER

Set an uppercase letter availability check

```
{
  key: "UPPERCASE_LETTER",
  label: "Password contains at least one uppercase letter"
}
```

| Key   | Type   | Description                                                                  |
| ----- | ------ | ---------------------------------------------------------------------------- |
| label | String | Optional. (Default value: "Password contains at least one uppercase letter") |

---

#### LOWERCASE_LETTER

Set a lowercase letter availability check

```
{
  key: "LOWERCASE_LETTER",
  label: "Password contains at least one lowercase letter"
}
```

| Key   | Type   | Description                                                                  |
| ----- | ------ | ---------------------------------------------------------------------------- |
| label | String | Optional. (Default value: "Password contains at least one lowercase letter") |

---

#### NUMERIC

Set a numeric character availability check

```
{
  key: "NUMERIC",
  label: "Password contains at least one numeric"
}
```

| Key   | Type   | Description                                                         |
| ----- | ------ | ------------------------------------------------------------------- |
| label | String | Optional. (Default value: "Password contains at least one numeric") |

---

#### SPECIAL_CHARS

Set a numeric character availability check

```
{
  key: "SPECIAL_CHARS",
  label: "Password contains at least one special character"
}
```

| Key   | Type   | Description                                                                   |
| ----- | ------ | ----------------------------------------------------------------------------- |
| label | String | Optional. (Default value: "Password contains at least one special character") |

---

#### PASSWORDS_MATCH

Set entered passwords matching validation check

```
{
  key: "PASSWORDS_MATCH",
  label: "Entered passwords are matching"
}
```

| Key   | Type   | Description                                                 |
| ----- | ------ | ----------------------------------------------------------- |
| label | String | Optional. (Default value: "Entered passwords are matching") |

<br />

## Props

| Name                      | Type                                                                                     | isRequired | Default Value      | Description                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------- | ---------- | ------------------ | ------------------------------------------------------------------ |
| newPassword               | `string`                                                                                 | Yes        | -                  | New password to be passed here                                     |
| confirmPassword           | `string`                                                                                 | Yes        | -                  | Confirm password to be passed here                                 |
| onPasswordValidateChanged | `Function`                                                                               | Yes        | -                  | The callback to be executed every time password fields get changed |
| validationRules           | `[{ key: string (required), label: string, ruleValue: number (depends on the key) }]` | Yes        | -                  | All the rules adding to validate passwords                         |
| containerStyle            | `ViewStyle`                                                                              | No         | -                  | Styling for container                                              |
| labelStyle                | `TextStyle`                                                                              | No         | -                  | Styling for labels in validation rows                              |
| iconStyle                 | `ImageStyle`                                                                             | No         | -                  | Styling for error and success icons                                |
| iconSuccessSource         | `ImageURISource`                                                                         | No         | Success image icon | Icon to show when validation passes                                |
| iconErrorSource           | `ImageURISource`                                                                         | No         | Error image icon   | Icon to show when validation fails                                 |
