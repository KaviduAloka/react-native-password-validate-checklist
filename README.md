# react-native-password-validate-checklist

A customizable component that validates passwords based on specific rules and displays a checklist indicating the validation status.

## Example

![Password Validation Example](https://user-images.githubusercontent.com/31509440/220936959-3800bf38-e446-4b51-bb21-d83e88168e30.gif)

## Installation

- Using Yarn: `yarn add react-native-password-validate-checklist`
- Using npm: `npm install react-native-password-validate-checklist`

## Usage

```jsx
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import PasswordValidate from "react-native-password-validate-checklist";

const Test = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [validated, setValidated] = useState(false);

  return (
    <View>
      <TextInput
        placeholder="Enter new password"
        onChangeText={setPassword1}
      />
      <TextInput
        placeholder="Confirm new password"
        onChangeText={setPassword2}
      />

      <PasswordValidate
        newPassword={password1}
        confirmPassword={password2}
        validationRules={[
          { key: "MIN_LENGTH", ruleValue: 9, label: "Minimum 9 characters" },
          { key: "MAX_LENGTH", ruleValue: 15, label: "Maximum 15 characters" },
          { key: "LOWERCASE_LETTER" },
          { key: "UPPERCASE_LETTER" },
          { key: "NUMERIC" },
          { key: "SPECIAL_CHARS" },
          { key: "PASSWORDS_MATCH" },
        ]}
        onPasswordValidateChange={setValidated}
        imageSource={{
          Success: require("./assets/success/success.png"),
          Error: require("./assets/error/error.png"),
        }}
        isImage={true}
        iconComponent={{
          Success: <Text>✔</Text>,
          Error: <Text>✖</Text>,
        }}
      />

      <Text>{validated ? "Password is valid" : "Password is invalid"}</Text>
    </View>
  );
};

export default Test;
```

## Validation Rules

Below are the possible rules you can use to validate passwords:

### MIN_LENGTH

Validates that the password has at least a specified number of characters.

```json
{
  "key": "MIN_LENGTH",
  "ruleValue": 10,
  "label": "Minimum length is 10 characters"
}
```

### MAX_LENGTH

Ensures the password does not exceed a specified number of characters.

```json
{
  "key": "MAX_LENGTH",
  "ruleValue": 15,
  "label": "Maximum length is 15 characters"
}
```

### UPPERCASE_LETTER

Validates that the password contains at least one uppercase letter.

```json
{
  "key": "UPPERCASE_LETTER",
  "label": "Requires at least one uppercase letter"
}
```

### LOWERCASE_LETTER

Ensures the password contains at least one lowercase letter.

```json
{
  "key": "LOWERCASE_LETTER",
  "label": "Requires at least one lowercase letter"
}
```

### NUMERIC

Validates that the password contains at least one numeric digit.

```json
{
  "key": "NUMERIC",
  "label": "Requires at least one numeric digit"
}
```

### SPECIAL_CHARS

Ensures the password contains at least one special character.

```json
{
  "key": "SPECIAL_CHARS",
  "label": "Requires at least one special character"
}
```

### PASSWORDS_MATCH

Checks if the new password and the confirm password match.

```json
{
  "key": "PASSWORDS_MATCH",
  "label": "Passwords must match"
}
```
## Props

| Name                    | Type                                | isRequired | Default Value | Description                                                                       |
|-------------------------|------------------------------------|------------|---------------|-----------------------------------------------------------------------------------|
| newPassword             | string                              | Yes        | -             | The new password to validate.                                                     |
| confirmPassword         | string                              | No         | -             | The confirm password to check if it matches the new password.                     |
| onPasswordValidateChange| Function                            | Yes        | -             | Callback function to execute when validation rules change.                        |
| validationRules         | [{ key: string, label: string, ruleValue: number }] | Yes | - | A list of rules used to validate passwords.                                      |
| containerStyle          | ViewStyle                           | No         | -             | Custom styling for the container.                                                 |
| labelStyle              | { Success: TextStyle, Error: TextStyle } | No   | -             | Custom styling for validation labels, distinguishing success and error states.  |
| imageStyle              | ImageStyle                          | No         | -             | Custom styling for success/error icons.                                           |
| imageSource             | { Success: ImageURISource, Error: ImageURISource } | No | - | Custom image sources for success and error icons.                                 |
| isImage                 | boolean                             | No         | true          | Flag to indicate if validation icons should be images or custom components.       |
| iconComponent           | { Success: React.ReactNode, Error: React.ReactNode } | No | - | Custom components to use as success/error icons, when not using images.          |
