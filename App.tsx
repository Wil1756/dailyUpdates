import {View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Signup from './screens/Signup';

export default function App() {
  return (
    <PaperProvider>
      <Signup/>
    </PaperProvider>
  );
}

