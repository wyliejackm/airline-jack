import React, { useContext } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import FlightCard from '../components/FlightCard'
import { Context as FlightContext } from './../contexts/FlightContext'
import { NavigationEvents } from 'react-navigation'

const FlightListScreen = () => {

    const { state, getFlights } = useContext(FlightContext)
    
    return <>
        <NavigationEvents onWillFocus={getFlights} />
        {state.length == 0 ? 
            <View style={styles.noneBox}><Text style={styles.noneText}>No upcoming flights. Book now!</Text></View>
            : <><Text style={styles.welcomeStyle}>Your upcoming flights:</Text>
                <FlatList
                    data={state}
                    keyExtractor={ item => item._id}
                    renderItem={( item ) => {
                        return <FlightCard flight={item.item} index={item.index}/>
                    }}
                /> 
            </>
        }
    </>
}

const styles = StyleSheet.create({
    welcomeStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 24,
        marginVertical: 10,
    },
    noneBox: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 10,

    },
    noneText: {
        textAlign: 'center',
        fontSize: 24,
    }
})

export default FlightListScreen