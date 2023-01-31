import {Text, View, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
    const onPressHandler = () => {
        navigation.navigate('Chuck');
    }

    return ( <View>
        <Text>Home Page</Text>
        <TouchableOpacity onPress={onPressHandler}>
            <Text>Goto Chuck Page</Text>
        </TouchableOpacity>
    </View>)
};

export default Home;