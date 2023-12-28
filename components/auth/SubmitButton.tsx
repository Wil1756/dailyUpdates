import React from 'react';
import { Button } from 'react-native-paper';

type SubmitButtonProps = {
    title: string;
    handleSubmit: ()=> void;
    loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({title, handleSubmit, loading}) => (
    <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={{
            backgroundColor: '#ff9900',
            marginTop: 20,
            height: 50,
            justifyContent: 'center',
            borderRadius: 24,
            margin: 15,
        }}
        labelStyle={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}
        uppercase={false}
    >
      {loading ? 'please wait ....' : title}
  </Button>
)

export default SubmitButton;
