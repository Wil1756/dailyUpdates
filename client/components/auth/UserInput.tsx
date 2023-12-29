import React,{useState} from 'react';
import {View} from 'react-native';
import { Text, useTheme, TextInput  } from 'react-native-paper';


type UserInputProps = {
    name: string;
    value: string;
    setValue: (text: string) => void;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    autoComplete?: 'name' | 'email' | 'password' | 'off';
    secureTextEntry?: boolean;
    keyboardType?:'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const UserInput: React.FC<UserInputProps> = ({
    name, 
    value, 
    setValue, 
    autoCapitalize='none', 
    keyboardType ='default', 
    secureTextEntry = false,
    autoComplete = 'off'
    }) => {
    const theme = useTheme();

    const handleInputChange  = (text: string) => {
       setValue(text);
       console.log(text)
    }
    
    return (
        <View style={{marginHorizontal: 24}}>
            <Text style={{...theme.fonts.medium, fontSize: 16, marginTop: 10}}>{name}</Text>
            <TextInput
                label={name}
                value={value}
                onChangeText={handleInputChange}
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
            
        </View>
    );
};
 
export default UserInput;
