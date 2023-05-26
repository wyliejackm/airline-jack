import React from 'react'
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FlightCard = ( { flight, index } ) => {
    
    const aircraftIcon = (aircraft) => {
        switch (aircraft) {
            case 'helicopter':
                return <MaterialCommunityIcons name="helicopter" size={30} color="black" />
                break;
            case 'jet':
                return <MaterialCommunityIcons name="airplane" size={30} color="black" />
                break
            case 'rocket':
                return <MaterialCommunityIcons name="rocket-launch" size={30} color="black" />
                break
            default: break
        }
    }

    return <>
        <View style={ index == 0 ? styles.cardBoxFirst : styles.cardBox}>
            <View style={styles.flightData}>
                <Text style={styles.memoText}>{flight.memo}</Text>
                <View style={styles.flightLine}>
                    {aircraftIcon(flight.aircraft)}
                    <Text style={styles.codeText}>{flight.depAirport.code}</Text>
                    <MaterialCommunityIcons name="arrow-right-thin-circle-outline" size={24} color="black" />
                    <Text style={styles.codeText}>{flight.arrAirport.code}</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <MaterialCommunityIcons name="dots-vertical" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={{alignSelf: 'center'}}>{new Date(flight.depDate).toDateString()}</Text>
            </View>
        </View>

    </>

}

const styles = StyleSheet.create({
    cardBox:{
        marginHorizontal: '2%',
        marginVertical: 3,
        padding: 10,
        flexDirection: 'row',
        borderColor: 'black',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10
    },
    cardBoxFirst: {
        marginHorizontal: '2%',
        marginVertical: 3,
        padding: 10,
        flexDirection: 'row',
        borderColor: 'dodgerblue',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderRadius: 10
    },
    memoText: {
        color: 'gray',
        alignSelf: 'center'
    },
    flightLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        flex: 1,
    },
    codeText: {
        fontSize: 20,
        marginHorizontal: 15,
        width: '25%',
        textAlign: 'center'
    },
    moreButton: {
        alignSelf: 'center',
    },
    flightData: {
        flex: 1
    }
})

export default FlightCard