import React, {useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import {getMeApi} from '../../services/studients'

const Profile = ({navigation}) => {
    useEffect(() => {
        const getMe = async () => {
            console.log('getMe')
            const res = await getMeApi()
            console.log(res)
        }

        getMe()
    }, [])
    
    const onPressHandler = () => {
        navigation.navigate('Chuck');
    }

    return (
        <View>
            <Text>Profile screen</Text>

            <TouchableOpacity onPress={onPressHandler}>
            <Text>Goto Chuck Page</Text>
        </TouchableOpacity>
        </View>
    )
}

export default Profile
