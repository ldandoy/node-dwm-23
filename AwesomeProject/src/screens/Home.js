import { useEffect, useState } from 'react';
import {View, Text} from 'react-native';

import {getSessions} from '../services/sessions';

const Home = ({navigation}) => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getSessions();
            console.log(res);
            setSessions(res);
        }

        getData();
    }, []);

    return <View>
        <Text>Liste des cours</Text>
        <View>
            {sessions.map((session) => <View key={session.id }> 
                <Text>
                    {session.label}
                </Text></View>)
            }
        </View>
    </View>
}

export default Home;