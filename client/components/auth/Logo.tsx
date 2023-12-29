import React from 'react';
import {View, Image} from 'react-native';


const Logo = () => ( 
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../../assets/logo.png')} style={{width: 150, height: 150, marginVertical: 5}}/>
    </View>
);

 
export default Logo;
