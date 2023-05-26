import React, { useContext } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../contexts/AuthContext'


const AccountScreen = () => {
    const { state, signout } = useContext(AuthContext)
    return <>
        <View style={styles.screenContainer}>
            <Text style={styles.titleStyle}>JackJets</Text>
            <Button title='Sign out'
                onPress={() => signout()}/>

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
})

export default AccountScreen