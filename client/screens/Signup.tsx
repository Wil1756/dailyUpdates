import React,{useState} from 'react';
import {View} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack';


import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import Logo from '../components/auth/Logo';
import axios from 'axios';

type RootStackParamList = {
  Signup: undefined;
  Signin: undefined;
};

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

type SignupProps = {
  navigation: SignupScreenNavigationProp;
};

const Signup: React.FC<SignupProps> = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // console.log("Navigation ->", navigation)

    const theme = useTheme(); 
    
    const handleSubmit = async () => {
      setLoading(true);
      if(!name || !email || !password){
        alert("All fields are required!!!")
        setLoading(false);
        return;
      }
      // console.log('SIGN UP REQUEST=>', name, email, password)
      try {
        const {data} = await axios.post("http://localhost:8000/api/signup",{
          name,
          email,
          password
        })
        setLoading(false);
        console.log('SIGN IN SUCESS =>', data);
        alert("Sign up successful");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', }}>
        <View style={{marginVertical: 100}}>
          <Logo/>
          <Text style={{ ...theme.fonts.medium, fontSize: 25, color: 'black',textAlign: 'center'}}>
            Sign Up
          </Text>
          <UserInput 
            name='NAME' 
            value={name} 
            setValue={setName} 
            autoCapitalize='words' 
            autoCorrect={false}
          />
          <UserInput 
            name='EMAIL'
            value={email} 
            setValue={setEmail}
            autoComplete='email'
            keyboardType='email-address'
          />
          <UserInput 
            name='PASSWORD' 
            value={password} 
            setValue={setPassword}
            secureTextEntry={true}
            autoComplete='password'
          />
          <SubmitButton 
            title='Sign Up' 
            handleSubmit={handleSubmit} 
            loading={loading}
          />
          <Text style={{textAlign:'center'}}>
            Alreadly Joined?&nbsp;
            <Text onPress={() => navigation.navigate('Signin')} style={{color: '#ff2222'}}>Sign In</Text>
          </Text>
        </View>
        
        {/* <Text>{JSON.stringify({name, email, password}, null , 4)}</Text> */}
      </KeyboardAwareScrollView>
    );
};
 
export default Signup;
