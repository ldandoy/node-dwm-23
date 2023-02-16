import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import {login} from '../services/studients'

const Login = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onPressHandler = async (event) => {
        console.log("tests")
        const res = await login({
            email,
            password
        });
        console.log("onPress", res);
        navigation.navigate('AppScreen');
    }

    return (
        <View>
            <Text>Login</Text>
            <TextInput 
                onChangeText={(text) => setEmail(text)}
                value={email} 
                name="email"
                placeholder='Votre adresse mail'
            ></TextInput>
            <TextInput
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder='Votre mot de passe' 
                name="password"
            ></TextInput>
            <TouchableOpacity
                onPress={onPressHandler}
            >
                <Text>Envoyer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
