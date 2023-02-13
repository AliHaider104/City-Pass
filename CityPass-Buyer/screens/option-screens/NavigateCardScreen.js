import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAPS_APIKEY} from '@env'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView } from 'react-native'

const NavigateCardScreen = () => {
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={styles.text}>Find The Best Available Offer</Text>
            <View style={styles.SearchContainer}>
                <GooglePlacesAutocomplete
                    onPress={(data,details = null) => {
                        console.log("Description: ",data.description);
                        console.log(details.geometry.location);
                        navigation.navigate('offercard',{
                            description: data.description,
                            details: details.geometry.location,
                          });
                    }}
                    
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    returnKeyType={'search'}
                    minLength={2}
                    placeholder={'Search offers ..'}
                    query={{
                        key:GOOGLE_MAPS_APIKEY,
                        language:'en',
                    }}
                    styles={{
                        container:{flex:0,},
                        textInput:{fontSize:20,}
                    }}
                     
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default NavigateCardScreen

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingTop:30,
        padding:10,
        backgroundColor:'#334756',
        height:'100%',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    text:{
        fontSize:20,
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
    },
    SearchContainer:{
        marginTop:15,
    }
})
