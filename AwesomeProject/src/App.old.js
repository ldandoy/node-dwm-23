import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { useState, useEffect } from 'react';

import {style} from './styles/global';

const App = ()  => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('useEffect !');
  }, [count]);
  
  const onPressHandler = () => {
    setCount(count+1);
    console.log("clique sur le bouton !", count);
  };

  return (<>
    <View>
      <Text style={style.text}>Hello World !</Text>
    </View>
    <View>
      <TouchableOpacity onPress={onPressHandler}>
        <Text>Cliquez ici</Text>
      </TouchableOpacity>
    </View>
    <View>
      <Text style={style.text}>{count}</Text>
    </View>
  </>)
}

export default App;
