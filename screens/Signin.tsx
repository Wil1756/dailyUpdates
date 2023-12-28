import React,{useState} from 'react';
import {View} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import Logo from '../components/auth/Logo';

import axios from 'axios';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const theme = useTheme(); 
    
    const handleSubmit = async () => {
      setLoading(true);
      if(!email || !password){
        alert("All fields are required!!!")
        setLoading(false);
        return;
      }
      // console.log('SIGN IN REQUEST=>', name, email, password)
      try {
        const {data} = await axios.post("http://localhost:8000/api/signin",{
          name,
          email,
          password
        })
        setLoading(false);
        console.log('SIGN IN SUCESS =>', data);
        alert("Sign In successful");
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
            Sign In
          </Text>

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
            title='Sign In' 
            handleSubmit={handleSubmit} 
            loading={loading}
          />
          <Text style={{textAlign:'center'}}>
            Not yet registered?&nbsp;
            <Text style={{color: '#ff2222'}}>Sign Up</Text>
          </Text>
          <Text style={{textAlign:'center', color:'#FFA500', marginTop:5}}>Forgot Password</Text>
        </View>
        
        {/* <Text>{JSON.stringify({name, email, password}, null , 4)}</Text> */}
      </KeyboardAwareScrollView>
    );
};
 
export default Signin;
