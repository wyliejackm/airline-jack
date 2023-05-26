import AsyncStorage from '@react-native-async-storage/async-storage';

import createDataContext from "./CreateDataContext"
import flightsApi from "../api/flights";

import { navigate } from './../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'signup':
            return {token: action.payload, errorMessage: ''}
        case 'signin':
            return {token:action.payload, errorMessage: ''}
        case 'signout':
            return {token: null, errorMessage: ''}
        default:
            return state;
    }
}

const signup = (dispatch) => {
    return async ( {email, password} ) => {
        try {
            const response = await flightsApi.post('/signup', { email, password} )
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: signup, payload: response.data.token})
            navigate('FlightList')
            //console.log(response.data)
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Unable to sign up' })
            //console.log(err.response.data)

        }
    }
}

const signin = (dispatch) => {
    return async ( {email, password} ) => {
        try {
            const response = await flightsApi.post('/signin', { email, password} )
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({ type: signin, payload: response.data.token})
            navigate('FlightList')
            //console.log(response.data)
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Unable to sign in' })
            console.log(err.response.data)

        }
    }
}

const signout = (dispatch) => async() => {
    await AsyncStorage.removeItem('token')
    dispatch( { type: 'signout' })
    navigate('loginFlow')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { token: null, errorMessage: '' }
)