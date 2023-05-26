import React, { useState, useContext } from 'react'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../contexts/AuthContext'

const SigninScreen = ( {navigation} ) => {
    const { state, signup, signin } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return <>
        <View style={styles.screenContainer}>
            <Text style={styles.titleStyle}>JackJets</Text>
            <View >
                <Text style={styles.labelStyle}>Username</Text>
                <TextInput style={styles.textBox}
                    value={email}
                    onChangeText={newEmail => setEmail(newEmail)}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}/>
                <Text style={styles.labelStyle}>Password</Text>
                <TextInput style={styles.textBox}
                    secureTextEntry
                    value={password}
                    onChangeText={newPassword => setPassword(newPassword)}
                    autoCapitalize='none'
                    autoCorrect={false}/>
            </View>
            <Text style={styles.errorStyle}>{state.errorMessage}</Text>
            <Button title='Sign in'
                onPress={() => signin({email, password})}/>
            <Button title='Sign up'
                onPress={() => signup({email, password})}/>
            {/* <Button title="Go to mainFlow"
                onPress={()=>navigation.navigate('mainFlow')}/> */}
        </View>
    </>

}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 32
    },  
    screenContainer: {
        flex: 1,
        // borderColor: 'black',
        // borderWidth: 1,
        marginHorizontal: 5,
        marginVertical: '20%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    labelStyle:{
        //alignSelf: 'center',
        fontSize: 20
    },
    textBox:{
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        height: 32,
        width: 300,
        marginBottom: 10,
        padding: 5,
        fontSize: 18
    },
    errorStyle: {
        fontSize: 24,
        color: 'red',
        height: 30
    }
})

export default SigninScreen