import React, { useState, useContext } from 'react'
import { Button, TextInput, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

import { Context as FlightContext } from './../contexts/FlightContext'

const FlightForm = () => {

    const { state, createFlight } = useContext(FlightContext)

    const [flightMemo, setFlightMemo] = useState('')
    const [aircraft, setAircraft] = useState('')
    const [newPax, setNewPax] = useState('')
    const [passengers, setPassengers] = useState([])
    const [departureAirport, setDepartureAirport] = useState({id: 0, code: '', name: ''})
    const [arrivalAirport, setArrivalAirport] = useState({id: 0, code: '', name: ''})
    const [departureDate, setDepartureDate] = useState(new Date())
    const [departureTime, setDepartureTime] = useState(new Date())

    const [aircraftTip, setAircraftTip] = useState('Each aircraft has special features')
    const [maxPax, setMaxPax] = useState(0)

    const airports = [
        {id: 1, code: 'KSMF', name: 'Sacramento International Airport'},
        {id: 2, code: 'KPHX', name: 'Phoenix Sky Harbor International Airport'},
        {id: 3, code: 'KLAX', name: 'Los Angeles International Airport'},
        {id: 4, code: 'KCMH', name: 'John Glenn Columbus International Airport'},
        {id: 5, code: 'KLGA', name: 'LaGuardia Airport'},
        {id: 6, code: 'KMIA', name: 'Miami International Airport'},
    ]

    const setAircraftDetails = () => {
        switch(aircraft) {
            case "helicopter":
                break
            case "jet":
                break
            case "rocket":
                break
        }
    }

    return <>
        <View style={styles.buttonHeader}>
            <Button title="Submit flight"
            onPress={() =>  {
                createFlight({
                    memo: flightMemo,
                    aircraft: aircraft,
                    passengers: passengers,
                    depAirport: departureAirport,
                    arrAirport: arrivalAirport,
                    depTime: departureTime,
                    depDate: departureDate
                })
                setFlightMemo('')
                setAircraft('')
                setNewPax('')
                setPassengers([])
                setDepartureAirport({id: 0, code: '', name: ''})
                setArrivalAirport({id: 0, code: '', name: ''})
                setDepartureDate
                setDepartureTime(new Date())
                }}/>
        </View>
        <TextInput style={styles.memoStyle}
            placeholder='Flight memo (optional)'
            value={flightMemo}
            onChangeText={newMemo => setFlightMemo(newMemo)}/>
        <Text style={styles.promptTitle}>Select your aircraft</Text>
        <View style={styles.aircraftBox}>
            <TouchableOpacity style={styles.aircraftOption}
                onPress={() => setAircraft({type: 'helicopter', maxPax: 8, tip: 'Great for short distances'})}>
                { aircraft.type == 'helicopter' ? 
                <MaterialCommunityIcons name="helicopter" size={48} color="dodgerblue" />
                : <MaterialCommunityIcons name="helicopter" size={48} color="black" /> }
            </TouchableOpacity>
            <TouchableOpacity style={styles.aircraftOption}
                onPress={() => setAircraft({type: 'jet', maxPax: 12, tip: 'Great for far distances'})}>
                { aircraft.type == 'jet' ? 
                <MaterialCommunityIcons name="airplane" size={48} color="dodgerblue" />
                 : <MaterialCommunityIcons name="airplane" size={48} color="black" /> }    
            </TouchableOpacity>
            <TouchableOpacity style={styles.aircraftOption}
                onPress={() => setAircraft({type: 'rocket', maxPax: 4, tip: 'Great for astronomical distances'})}>
                    { aircraft.type == 'rocket' ? 
                    <MaterialCommunityIcons name="rocket-launch" size={48} color="dodgerblue" />
                     : <MaterialCommunityIcons name="rocket-launch" size={48} color="black" />}
            </TouchableOpacity>
        </View>
        <Text style={styles.aircraftTip}>{aircraft.tip}</Text>
        <View style={styles.airportsBox}>
            <View style={styles.airportsSubBox}>
                <View style={styles.routeLabel}>
                    <MaterialCommunityIcons name="airplane-takeoff" size={32} color="black" />
                    <Text style={styles.routeLabelText}>Departure</Text>
                </View>
                <SelectDropdown
                    data={airports}
                    rowTextForSelection={(airport, index) => {
                        return airport.code;}}
                    buttonTextAfterSelection={(airport, index) => {
                        return airport.code}}
                    defaultButtonText={"Select airport"}
                    onSelect={(selectedItem, index) => {
                        setDepartureAirport({ id: selectedItem.id, code: selectedItem.code, name: selectedItem.name})
                      }}               
                 />
                 <Text style={styles.airportName}>{departureAirport.name}</Text>
                 <DateTimePicker mode="date" 
                    minimumDate={(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))}
                    accentColor='black'
                    value={departureDate}substring
                    // grab the date from newDate, grab the time from departureDate, combine and set
                    onChange={(event, date) => setDepartureDate(date)}/>
                <View style={{height:1}}/>
                <DateTimePicker mode="time" 
                    minuteInterval={15}
                    accentColor='black'
                    value={departureTime}
                    // grab the date from departureDate, grab the time from newDate, combine and set
                    onChange={(event, date) => setDepartureTime(date)}/>
            </View>
            <View style={styles.airportsSubBox}>
                <View style={styles.routeLabel}>
                    <Text style={styles.routeLabelText}>Arrival</Text>
                    <MaterialCommunityIcons name="airplane-landing" size={32} color="black" />
                </View>
                <SelectDropdown 
               data={airports}
                rowTextForSelection={(airport, index) => {
                    return airport.code;}}
                buttonTextAfterSelection={(airport, index) => {
                    return airport.code}}
                defaultButtonText={"Select airport"}
                onSelect={(selectedItem, index) => {
                    setArrivalAirport({ id: selectedItem.id, code: selectedItem.code, name: selectedItem.name})
                  }}    
            />
            <Text style={styles.airportName}>{arrivalAirport.name}</Text>


            </View>

        </View>
    
        <View style={{height: 10}}/>
        <Text style={styles.promptTitle}>Declare passengers ({passengers.length}/{aircraft.maxPax})</Text>

        { aircraft.maxPax > passengers.length ?         
            <View style={styles.newPax}>
                <TextInput style={styles.declarePax}
                    placeholder="Enter a name"
                    value={newPax}
                    onChangeText={text => setNewPax(text)}/>
                <TouchableOpacity onPress={() => {
                    setPassengers([newPax, ...passengers])
                    setNewPax('')
                    }}>
                    <MaterialCommunityIcons name="plus" size={32} color="black" />
                </TouchableOpacity>
            </View>
            : <></>}
        { aircraft.maxPax < passengers.length ? 
            <Text style={styles.warningText}>Warning, overcapacity!</Text>:<></>}
    
        <FlatList
            data={passengers}
            keyExtractor={(item) => item}
            renderItem={ ( {item} ) => {
                return <View>
                    <View style={styles.paxStyle}>
                        <Text style={{ fontSize: 20}}>{item}</Text>
                        <TouchableOpacity style={styles.trashButton}
                            onPress={() => setPassengers(passengers.filter((pax) => pax != item))}>
                            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paxDivider} />
                </View>
            }}/>
    </>
}

const styles = StyleSheet.create({
    memoStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 5,
        color:  'gray',
        width: '90%'
    },
    buttonHeader: {
        marginTop: '12.5%',
        marginBottom: 5
    },
    promptTitle: {
        fontSize: 24,
        alignSelf: 'center',
    },
    aircraftBox: {
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: 'center'
    },
    aircraftOption: {
        alignItems: 'center',
        width: '25%',
    },
    aircraftOptionSelect: {

    },
    aircraftTip: {
        alignSelf: 'center',
        color: 'gray',
        marginBottom: 5
    },

    routeLabel: {
        marginLeft: '5%',
        flexDirection: 'row',
        marginBottom: 5
    },
    routeLabelText:{
        paddingHorizontal: 5,
        alignSelf: 'center',
        fontSize: 20,
    },
    airportsBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    airportsSubBox: {
        alignItems: 'center',
        paddingHorizontal: 15,
        flex:1
    },
    newPax: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginVertical: 10,
    },
    declarePax: {
        flex: 1,
        paddingHorizontal: 10,
        marginRight: '2%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20
    },
    paxStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginHorizontal: '5%',
        marginVertical: 2,
        paddingHorizontal: 10,
        marginHorizontal: '5%',
        marginVertical: 2
    },
    paxDivider: {
        width: '90%',
        height: 1,
        backgroundColor: 'lightgray',
        alignSelf: 'center'
    },
    warningText: {
        alignSelf: 'center',
        color: 'orange',
        fontSize: 20,
        marginVertical: 14
    },
    airportName: {
        marginBottom: 5,
        color: 'gray',
        textAlign: 'center'
    }
})

export default FlightForm