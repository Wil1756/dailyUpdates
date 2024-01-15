import React,{useState} from 'react';
import {View} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import Logo from '../components/auth/Logo';

import axios from 'axios';
import { API } from '../config';

type RootStackParamList = {
  Signup: undefined;
  Signin: undefined;
};

type SigninScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signin'>;

type SigninProps = {
  navigation: SigninScreenNavigationProp;
};


const Signin: React.FC<SigninProps> = ({navigation}) => {
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
      console.log('SIGN IN REQUEST=>', email, password)
      try {
        const {data} = await axios.post(`${API}/signin`,{
          email,
          password
        })
        if (data.error){
          alert(data.error)
          setLoading(false);
        }else{
          await AsyncStorage.setItem('@auth',JSON.stringify(data))
          setLoading(false);
          console.log('SIGN IN SUCESS =>', data);
          alert("Sign In successful");
        }
        
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      
      const loadFromAsyncStorage =async () => {
        let data = await AsyncStorage.getItem('@auth');
        console.log('FROM ASYNC STORAGE => ',data)
      }
      loadFromAsyncStorage()
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
            Don't have an account already?&nbsp;
            <Text onPress={()=> navigation.navigate('Signup')}style={{color: '#ff2222'}}>Sign Up</Text>
          </Text>
          <Text style={{textAlign:'center', color:'#FFA500', marginTop:5}}>Forgot Password</Text>
        </View>
        
        {/* <Text>{JSON.stringify({name, email, password}, null , 4)}</Text> */}
      </KeyboardAwareScrollView>
    );
};
 
export default Signin;
