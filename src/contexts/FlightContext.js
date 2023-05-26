import React, { useReducer } from 'react'
import createDataContext from './CreateDataContext';
import flightApi from '../api/flights'

import { navigate } from './../navigationRef'

const flightReducer = (state, action) => {
    switch(action.type) {
        // case 'delete_blogpost':
        //     return state.filter((blogPost) => blogPost.id !== action.payload)
        // case 'edit_blogpost':
        //     return state.map((blogPost) => {
        //         return blogPost.id === action.payload.id ? action.payload : blogPost })
        case 'get_flights':
            return action.payload
        default:
            return state
    }
}

const getFlights = dispatch => async () => {
    try {
        const response = await flightApi.get('/flights')
        dispatch({ type: 'get_flights', payload: response.data })
    } catch (err) {
        console.log(err.response.data)
    }
}

const createFlight = dispatch => async (req, res) => {
    try {
        const response = await flightApi.post('/flight', req)
        //console.log(response.data)
        navigate('FlightList')
    } catch (err) {
        console.log('error')

    } 
}

export const { Provider, Context } = createDataContext(
    flightReducer,
    { getFlights, createFlight },
    { }
)