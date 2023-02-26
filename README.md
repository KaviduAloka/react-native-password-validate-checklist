# react-native-password-validate-checklist

A customizable component which can add rules to a password and show the status of each validation.

## Example

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/31509440/220936959-3800bf38-e446-4b51-bb21-d83e88168e30.gif)

<br />

## Installation
```yarn add react-native-password-validate-checklist```
<br /><br />
```npm install react-native-password-validate-checklist```
<br />

## Usage

```
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

import PasswordValidate, {
  VALIDATION_RULES_KEYS,
} from 'react-native-password-validate-checklist';

const Test = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [validated, setValidated] = useState(false);

  const rules = [
    {key: VALIDATION_RULES_KEYS.MIN_LENGTH, ruleValue: 10, label: 'Should contain more than 9 characters'},
    {key: VALIDATION_RULES_KEYS.MAX_LENGTH, ruleValue: 15, label: 'අක්ෂර 15 කට වඩා තිබිය නොහැක'},
    {key: VALIDATION_RULES_KEYS.LOWERCASE_LETTER},
    {key: VALIDATION_RULES_KEYS.UPPERCASE_LETTER},
    {key: VALIDATION_RULES_KEYS.NUMERIC},
    {key: VALIDATION_RULES_KEYS.PASSWORDS_MATCH},
    {key: VALIDATION_RULES_KEYS.SPECIAL_CHARS},
  ];
  
  return (
    <View>
      <TextInput onChangeText={text => setPassword1(text)} />

      <TextInput onChan

      <PasswordValidate
        newPassword={password1}
        confirmPassword={password2}
        validationRules={rules}
        onPasswordValidateChange={status => setValidated(status)}
      />
    </View>
  );
};
export default Test;
```

This library is capable of customizing validation labels as well. This is helpful for multiple languages supported applications
## Possible validation rules
---
#### MIN_LENGTH
Set a minimum characters validation check
```
{
  key: VALIDATION_RULES_KEYS.MIN_LENGTH,
  ruleValue: 10,
  label: "Minimum characters count is 10"
}
```

|Key   | Type |  Description  |
|------|------|---------------|
|ruleValue|Numeric|-|
|label|String| Optional. (Default value: "Password contains more than ${ruleValue} characters")|

---
#### MAX_LENGTH
Set a maximum characters validation check
```
{
  key: VALIDATION_RULES_KEYS.MAX_LENGTH,
  ruleValue: 15,
  label: "Maximum characters count is 15"
}
```
|Key   | Type |  Description  |
|------|------|---------------|
|ruleValue|Numeric|-|
|label|String| Optional. (Default value: "Password does not contain more than ${ruleValue} characters")|

---
#### UPPERCASE_LETTER
Set an uppercase letter availability check
```
{
  key: VALIDATION_RULES_KEYS.UPPERCASE_LETTER,
  label: "Password contains at least one uppercase letter"
}
```
|Key   | Type |  Description  |
|------|------|---------------|
|label|String| Optional. (Default value: "Password contains at least one uppercase letter")|

---
#### LOWERCASE_LETTER
Set a lowercase letter availability check
```
{
  key: VALIDATION_RULES_KEYS.LOWERCASE_LETTER,
  label: "Password contains at least one lowercase letter"
}
```
|Key   | Type |  Description  |
|------|------|---------------|
|label|String| Optional. (Default value: "Password contains at least one lowercase letter")|

---
#### NUMERIC
Set a numeric character availability check
```
{
  key: VALIDATION_RULES_KEYS.NUMERIC,
  label: "Password contains at least one numeric"
}
```
|Key   | Type |  Description  |
|------|------|---------------|
|label|String| Optional. (Default value: "Password contains at least one numeric")|

---
#### SPECIAL_CHARS
Set a numeric character availability check
```
{
  key: VALIDATION_RULES_KEYS.SPECIAL_CHARS,
  label: "Password contains at least one special character"
}
```
|Key   | Type |  Description  |
|------|------|---------------|
|label|String| Optional. (Default value: "Password contains at least one special character")|

---
#### PASSWORDS_MATCH
Set entered passwords matching validation check
```
{
  key: VALIDATION_RULES_KEYS.PASSWORDS_MATCH,
  label: "Entered passwords are matching"
}
```
|Key   | Type |  Description  |
|------|------|---------------|
|label|String| Optional. (Default value: "Entered passwords are matching")|

<br />

## Props

| Name | Type | isRequired | Default Value | Description |
|------|------|------------|---------------|-------------|
|newPassword|``String``|Yes|-|New password to be passed here|
|confirmPasswor|``String``|Yes|-|Confirm password to be passed here|
|onPasswordValidateChanged|``Function``|Yes|-|The callback to be executed everytime password fields get changed|
|validationRules|``[{ key: String (isRequired), label: String (isRequired), ruleValue: Number (option) }]``|Yes|-|All the rules adding to validate passwords|
|containerStyle|``StyleProps``|No|-|Styling for container|
|labelStyle|``StyleProps``|No|-|Styling for labels in validation rows|
|iconStyle|``StyleProps``|No|-|Styling for error and success icons|
|iconSuccessSource|``ImageSource``|No|Success image icon|Icon to show when validation passes|
|iconErrorSource|``ImageSource``|No|Error image icon|Icon to show when validation fails|
