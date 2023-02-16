import axios from 'axios';

export const login = async (data) => {
    try {
        const res = await axios.post(
            'http://192.168.50.34:4500/students/login',
            data
        );
        return res.data;
    } catch (error) {
        console.log('error', error)
        return error.response;
    }
}

export const getMeApi = async () => {
    try {
        const res = await axios.get(
            'http://192.168.50.34:4500/students/me'
        );
        return res.data;
    } catch (error) {
        console.log('error', error)
        return error.response;
    }
}