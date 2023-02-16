import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Login';
import AppScreen from './screens/AppScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" options={{headerShown: false}} component={LoginScreen}></Stack.Screen>
                <Stack.Screen name="AppScreen" options={{headerShown: false}} component={AppScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;