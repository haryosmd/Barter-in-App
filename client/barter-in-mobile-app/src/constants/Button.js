import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from './Colors'

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.PRIMARY,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
      }}>
      <Text style={{color: COLORS.WHITE, fontWeight: 'bold', fontSize: 18}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;