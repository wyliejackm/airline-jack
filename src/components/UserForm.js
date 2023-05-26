import React, { useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet } from 'react-native'

const UserForm = ({ onFormSubmit, buttonTitle }) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
    return <>
        <Text>Username</Text>
        <TextInput style={styles.textBox}
            value={email}
            onChangeText={newEmail => setEmail(newEmail)}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}/>
        <Text>Password</Text>
        <TextInput style={styles.textBox}
            secureTextEntry
            value={password}
            onChangeText={newPassword => setPassword(newPassword)}
            autoCapitalize='none'
            autoCorrect={false}/>
        <Button title={buttonTitle}
            onPress={onFormSubmit}/>
    </>

}

const styles = StyleSheet.create({
    textBox:{
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10
    }
})

export default UserForm