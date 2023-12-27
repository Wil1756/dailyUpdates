import React,{useState} from 'react';
import {View} from 'react-native';
import { Text, useTheme, TextInput  } from 'react-native-paper';


type UserInputProps = {
    name: string;
    value: string;
    setValue: (text: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({name, value, setValue}) => {
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
            />
        </View>
    );
};
 
export default UserInput;
