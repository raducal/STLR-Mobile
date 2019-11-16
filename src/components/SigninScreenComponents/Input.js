import React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Input = ({
  styles,
  iconName,
  inputStyle,
  placeholder,
  setter,
  choice,
  label
}) => {
  return (
    <View style={styles}>
      <Icon name={iconName} size={30} style={{ color: "lightgrey" }} />
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        secureTextEntry={choice}
        autoCapitalize="none"
        onChangeText={text => setter(text)}
        value={label}
      />
    </View>
  );
};

export default Input;
