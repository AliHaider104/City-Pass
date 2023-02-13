import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const OfferCardScreen = ({ route, navigation }) => {
    const { description, details } = route.params;
    return (
        <View style={styles.contianer}>
            <Text style={styles.TargetLocationName}>{description}</Text>
        </View>
    )
}

export default OfferCardScreen

const styles = StyleSheet.create({
    contianer:{
        flex:1,
        padding:10,
        
    },
    TargetLocationName:{
        top:20,
        fontSize:18,
        fontWeight:'bold',
    },
})
