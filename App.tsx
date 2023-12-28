import {View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Signup from './screens/Signup';
import Signin from './screens/Signin';

export default function App() {
  return (
    <PaperProvider>
      {/* <Signup/> */}
      <Signin/>
    </PaperProvider>
  );
}

