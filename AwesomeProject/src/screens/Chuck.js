import React, { useEffect, useState } from 'react'
import {Text, View} from 'react-native';

const Chuck = () => {
    const [fact, setFact] = useState({})

    getChuckFact = async () => {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        console.log(res);
        const chuckFact = await res.json();
        console.log(chuckFact);
        setFact(chuckFact)
    }

    useEffect(() => {
        getChuckFact();
    }, [])

    return (
        <View>
            <Text>Chuck Page</Text>
            <Text>{fact.id}</Text>
        </View>
    )
}

export default Chuck
