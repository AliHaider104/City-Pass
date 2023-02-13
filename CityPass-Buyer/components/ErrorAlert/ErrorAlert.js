import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorAlert = ({message ,type}) => {
    return (
        <View 
        style={[
            styles.ErrorContainer,
            styles[`ErrorContainer_${type}`]]}>
            <Text>{message}</Text>
        </View>
    )
}

export default ErrorAlert

const styles = StyleSheet.create({
    ErrorContainer:{
        padding:5,
        marginTop:5,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        opacity: 0.4,
        textAlign:'center',
    },
    ErrorContainer_error:{
        backgroundColor:'red',
    },
    
})
