import React from 'react';
import {View} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import UserInputs from '../components/auth/UserInputs';

const Signup = () => {
    const theme = useTheme(); // Access the theme object from react-native-paper
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <Text style={{ ...theme.fonts.medium, fontSize: 25, color: 'black',textAlign: 'center'}}>
          Sign Up
        </Text>
        <UserInputs/>
      </View>
    );
};
 
export default Signup;
