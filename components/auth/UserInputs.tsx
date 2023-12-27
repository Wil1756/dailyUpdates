import React from 'react';
import {View} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

const UserInputs = () => {
    const theme = useTheme(); // Access the theme object from react-native-paper
    
    return (
        <View style={{marginHorizontal: 24}}>
            <Text style={{...theme.fonts.medium, fontSize: 16, marginTop: 10}}>NAME:</Text>
            <TextInput
                label="Name"
                value={''}
                // onChangeText={''}
            />
        </View>
    );
};
 
export default UserInputs;
