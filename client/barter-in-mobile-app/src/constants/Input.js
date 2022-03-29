import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLORS from './Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 25}}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.PERSIAN_RED
              : isFocused
              ? COLORS.DARK_GREY
              : COLORS.LIGHT_GRAY,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: COLORS.DARK_GREY, fontSize: 22, marginRight: 10}}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.DARK_GREY, flex: 1}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: COLORS.DARK_GREY, fontSize: 22}}
          />
        )}
      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.PERSIAN_RED, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.GRAY,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.LIGHT_GRAY,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    borderRadius: 8
  },
});

export default Input;