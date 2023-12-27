import React,{useState} from 'react';
import {View} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import UserInput from '../components/auth/UserInput';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const theme = useTheme(); // Access the theme object from react-native-paper
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', }}>
        <Text style={{ ...theme.fonts.medium, fontSize: 25, color: 'black',textAlign: 'center'}}>
          Sign Up
        </Text>
        <UserInput name='NAME' value={name} setValue={setName}/>
        <UserInput name='EMAIL'value={email} setValue={setEmail}/>
        <UserInput name='PASSWORD' value={password} setValue={setPassword}/>

        <Text>{JSON.stringify({name, email, password}, null , 4)}</Text>
      </View>
    );
};
 
export default Signup;
